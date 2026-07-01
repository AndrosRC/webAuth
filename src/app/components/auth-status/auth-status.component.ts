import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [IonicModule],
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