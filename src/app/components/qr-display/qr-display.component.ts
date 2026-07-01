import { Component, input, output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-display',
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    QRCodeComponent,
  ],
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
