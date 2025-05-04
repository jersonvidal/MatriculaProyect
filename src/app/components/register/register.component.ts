import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username: string = '';
  firstname: string = '';
  lastname: string = '';
  country: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const user = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      country: this.country,
      password: this.password // Asumimos que tu backend también espera una contraseña
    };

    this.http.post('http://localhost:8080/auth/register', user).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: '¡Registrado!',
        text: 'Usuario registrado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });      this.router.navigate(['/']);
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar usuario.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
