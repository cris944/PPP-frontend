import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para autenticar al usuario
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // Guardar el token en el localStorage o sessionStorage si la autenticación es exitosa
  saveToken(token: string): void {
    console.log('Token guardado:', token);
    localStorage.setItem('authToken', token);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Cerrar sesión (eliminar el token)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
