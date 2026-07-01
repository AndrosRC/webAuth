import { Component, inject, OnInit, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { BackendService } from '../../services/backend';
import { addIcons } from 'ionicons';
import { trash, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [IonItem, IonLabel, IonBadge, IonButton, IonIcon, DatePipe],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  public backendService = inject(BackendService);
  // Evento que avisa al padre cuando se revoca un registro
  revokedEvent = output<number>();

  constructor() {
    addIcons({ trash, closeCircleOutline });
  }

  ngOnInit() {
    this.backendService.fetchRequests();
  }

  onRevoke(id: number) {
    this.backendService.revokeRequest(id).subscribe(() => {
      this.backendService.fetchRequests();
      this.revokedEvent.emit(id); // Notificamos la revocación
    });
  }

  onDelete(id: number) {
    this.backendService.deleteRequest(id).subscribe(() => {
      this.backendService.fetchRequests();
    });
  }
}
