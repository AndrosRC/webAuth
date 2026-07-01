import { Injectable, signal } from '@angular/core';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { TOTP } from 'totp-generator';

@Injectable({
  providedIn: 'root'
})
export class AuthToolsService {
  public currentPin = signal<string>('000 000');
  public scanResult = signal<string | null>(null);
  public isScanning = signal<boolean>(false);
  
  // Nuevas señales para replicar el temporizador de Google Authenticator
  public timeLeft = signal<number>(30);
  public progressPercentage = signal<number>(100);
  
  private intervalRef: any;

  async startScan() {
    try {
      this.isScanning.set(true);
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      this.isScanning.set(false);

      if (result.ScanResult) {
        this.scanResult.set(result.ScanResult);
        this.generateContinuousTotp(result.ScanResult);
      }
    } catch (error) {
      this.isScanning.set(false);
      console.error('Escaneo cancelado o fallido', error);
    }
  }

  stopScan() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    this.scanResult.set(null);
    this.currentPin.set('000 000');
    this.progressPercentage.set(100);
  }

  generateContinuousTotp(secret: string) {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    
    this.updatePin(secret);
    
    this.intervalRef = setInterval(() => {
      this.updatePin(secret);
    }, 1000);
  }

  private async updatePin(secret: string) {
    try {
      // Calculamos el tiempo restante basado en el reloj universal para sincronización exacta
      const epochSeconds = Math.floor(Date.now() / 1000);
      const remainingSeconds = 30 - (epochSeconds % 30);
      
      this.timeLeft.set(remainingSeconds);
      this.progressPercentage.set((remainingSeconds / 30) * 100);

      const result = await TOTP.generate(secret);
      
      // Formateamos el pin con un espacio en medio para mayor legibilidad
      const otpStr = result.otp.toString();
      const formattedOtp = otpStr.substring(0, 3) + ' ' + otpStr.substring(3, 6);
      this.currentPin.set(formattedOtp);
      
    } catch (e) {
      console.error('El texto escaneado no es una clave secreta valida para TOTP');
    }
  }
}