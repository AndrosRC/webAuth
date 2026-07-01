import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthToolsService } from '../../services/auth-tools';
import { addIcons } from 'ionicons';
import { barcodeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mobile-scanner',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton,
  ],
  templateUrl: './mobile-scanner.component.html',
  styleUrls: ['./mobile-scanner.component.scss']
})
export class MobileScannerComponent {
  public authTools = inject(AuthToolsService);

  constructor() {
    addIcons({ barcodeOutline });
  }

  async startScanning() {
    try {
      await this.authTools.startScan();
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  stopScanning() {
    this.authTools.stopScan();
  }
}
