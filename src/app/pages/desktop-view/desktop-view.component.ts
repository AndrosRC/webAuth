import { Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthStatusComponent } from '../../components/auth-status/auth-status.component';
import { QrDisplayComponent } from '../../components/qr-display/qr-display.component';
import { ActivityLogComponent } from '../../components/activity-log/activity-log.component';
import { BackendService } from '../../services/backend';

@Component({
  selector: 'app-desktop-view',
  standalone: true,
  imports: [IonicModule, AuthStatusComponent, QrDisplayComponent, ActivityLogComponent],
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent {
  private backend = inject(BackendService);
  
  public currentSecret = signal<string>('');
  public currentRecordId = signal<number | null>(null);

  handleGenerate(event: {service: string, email: string}) {
    this.backend.createAuthRequest({ service_name: event.service, user_email: event.email })
      .subscribe(res => {
        this.currentSecret.set(res.secret);
        this.currentRecordId.set(res.id);
        this.backend.fetchRequests();
      });
  }

  // Nueva lógica: si el registro revocado es el mismo del QR, lo limpiamos
  handleRevoke(id: number) {
    if (this.currentRecordId() === id) {
      this.currentSecret.set('');
      this.currentRecordId.set(null);
    }
  }

  handleVerify(pin: string) {
    const id = this.currentRecordId();
    if (id) {
      this.backend.verifyTotp(id, pin).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.currentSecret.set('');
          this.currentRecordId.set(null);
          this.backend.fetchRequests(); 
        },
        error: (err) => {
          alert(err.error.message || 'Error de verificación');
        }
      });
    }
  }
}