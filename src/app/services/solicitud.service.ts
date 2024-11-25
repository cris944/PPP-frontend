import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:3000/api'; // URL base de la API

  constructor(private http: HttpClient) {}

  obtenerDatosEstudiante(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiante`);
  }

  obtenerEmpresas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas`);
  }

  enviarSolicitud(solicitud: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitudes`, solicitud);
  }

  rechazarSolicitud(codigo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/solicitudes/${codigo}`);
  }
}
