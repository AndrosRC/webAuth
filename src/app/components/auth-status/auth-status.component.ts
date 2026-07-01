import { Component, input, output } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
  templateUrl: './auth-status.component.html',
  styleUrls: ['./auth-status.component.scss']
})
export class AuthStatusComponent {
  serviceName = input<string>('');
  userEmail = input<string>('');
  generateQrEvent = output<{service: string, email: string}>();

  onGenerate() {
    this.generateQrEvent.emit({
      service: this.serviceName(),
      email: this.userEmail()
    });
  }
}
