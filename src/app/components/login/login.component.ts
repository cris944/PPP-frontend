import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.accessToken) {
          this.authService.saveToken(response.accessToken); // Guarda el token en localStorage
          console.log('Token guardado exitosamente:', response.accessToken);
          console.log('Redirigiendo a /Coche')
          this.router.navigate(['/solicitud']);  // Redirige a la página de inicio
        } else {
          this.loginError = true;  // Si hay error en login, mostramos un mensaje
        }
      },
      (error) => {
        console.error('ERROR:', error);
        this.loginError = true;
      }
    );
  }
}
