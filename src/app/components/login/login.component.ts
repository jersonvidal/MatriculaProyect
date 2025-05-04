import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../register/register.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RegisterComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // Registro
  regUsername: string = '';
  regFirstname: string = '';
  regLastname: string = '';
  regCountry: string = '';
  regPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const data = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/auth/login', data).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: '¡Login exitoso!',
        text: 'Bienvenido al sistema',
        confirmButtonText: 'Continuar'
      });
      this.router.navigate(['/index']);
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas',
        confirmButtonText: 'Intentar de nuevo'
      });
      });

  }

  register() {
    const newUser = {
      username: this.regUsername,
      firstname: this.regFirstname,
      lastname: this.regLastname,
      country: this.regCountry,
      password: this.regPassword
    };

    this.http.post('http://localhost:8080/auth/register', newUser).subscribe(() => {
      alert('Registrado correctamente');
      (document.getElementById('closeModalBtn') as HTMLButtonElement).click(); // cerrar modal
    }, () => alert('Error al registrarse'));
  }
}
