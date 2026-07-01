import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-auth-sec.vercel.app/api';
  
  
  public activityLogs = signal<any[]>([]);

  createAuthRequest(data: { service_name: string, user_email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/request`, data);
  }

  fetchRequests(): void {
    this.http.get<any[]>(`${this.apiUrl}/records`).subscribe(data => {
      const processedData = data.map(item => {
        let dateValue = null;
        
        if (item.created_at) {
          // Limpiamos el string: eliminamos la 'Z' si ya tiene el offset '+00:00'
          // Esto evita la confusión del motor de fechas de JS
          const cleanDateString = item.created_at.replace('Z', '');
          const d = new Date(cleanDateString);
          
          dateValue = !isNaN(d.getTime()) ? d : null;
        }
        
        return {
          ...item,
          created_at: dateValue
        };
      });
      this.activityLogs.set(processedData);
    });
  }

  verifyTotp(id: number, pin: string) {
    return this.http.post(`${this.apiUrl}/verify`, { id, pin });
  }
  // En tu backend.service.ts
  revokeRequest(id: number) {
    // Cambia el estado a 'Revocado'
    return this.http.post(`${this.apiUrl}/revoke/${id}`, {});
  }

  deleteRequest(id: number) {
    // Elimina la fila de la BD
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  public activeQrSecret = signal<string | null>(null) ; 
  public activeRecordId = signal<number | null>(null);
}