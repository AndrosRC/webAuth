import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-display',
  standalone: true,
  imports: [IonicModule, QRCodeComponent],
  templateUrl: './qr-display.component.html',
  styleUrls: ['./qr-display.component.scss']
})
export class QrDisplayComponent {
  qrData = input<string>('');
  verifyEvent = output<string>();

  onVerify(pinValue: string | number | null | undefined) {
    if (pinValue) {
      this.verifyEvent.emit(pinValue.toString());
    }
  }
}