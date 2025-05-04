
import {Component, OnInit, } from '@angular/core';
import { AlumnoServicesService } from '../../../services/alumno-services.service';
import { Alumno } from '../../../models/Alumno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-lista-alumnos',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent implements OnInit {

  alumnos: Alumno[] = [];

  // Campos del formulario para registrar
  nombres: string = '';
  apellidos: string = '';
  dni: string = '';
  correo: string = '';

  alumnoSeleccionado: any = {
    idAlumno: 0,
    nombres: '',
    apellidos: '',
    dni: '',
    correo: ''
  };

  constructor(private servicioAlumno: AlumnoServicesService) {
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.servicioAlumno.listar().subscribe({
      next: (data) => this.alumnos = data,
      error: (err) => console.error('Error al listar alumnos', err)
    });
  }

  registrarAlumno(): void {
    const nuevoAlumno: Omit<Alumno, 'idAlumno'> = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      dni: this.dni,
      correo: this.correo
    };

    this.servicioAlumno.registrar(nuevoAlumno).subscribe({
      next: (resp) => {
        console.log('Alumno registrado:', resp);
        Swal.fire('Éxito', 'Alumno registrado correctamente', 'success').then(() => {
        });        this.cargarAlumnos(); // Recargar la lista
        // Limpiar campos
        this.nombres = '';
        this.apellidos = '';
        this.dni = '';
        this.correo = '';
      },
      error: (err) => {
        console.error('Error al registrar alumno', err);
        Swal.fire('Error', 'No se pudo registrar el alumno', 'error'); // Mostrar SweetAlert en caso de error
      }
    });
  }

  // Seleccionar alumno para edición
  seleccionarAlumno(alumno: Alumno): void {
    this.alumnoSeleccionado = {...alumno}; // Copiar el objeto
  }

// Cancelar edición
  cancelarActualizacion(): void {
    this.alumnoSeleccionado = {idAlumno: 0, nombres: '', apellidos: '', dni: '', correo: ''};
  }

// Actualizar alumno
  actualizarAlumno(): void {
    this.servicioAlumno.actualizar(this.alumnoSeleccionado.idAlumno, this.alumnoSeleccionado).subscribe({
      next: (resp) => {
        console.log('Alumno actualizado:', resp);
        Swal.fire('Éxito', 'Alumno actualizado correctamente', 'success');
        this.cargarAlumnos(); // Refrescar lista
        this.cancelarActualizacion(); // Limpiar formulario
      },
      error: (err) => {
        console.error('Error al actualizar alumno', err);
        Swal.fire('Error', 'No se pudo actualizar el alumno', 'error');
      }

    });
  }

// Eliminar alumno
  eliminarAlumno(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al alumno permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicioAlumno.eliminar(id).subscribe({
            next: (response) => {
              Swal.fire('Éxito', 'Alumno eliminado correctamente', 'success');
              this.cargarAlumnos(); // Recargar la lista
            },
            error: (err) => {
              console.error('Error al eliminar alumno', err);
              Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
            }
          });
        }
      });
    } else {
      console.error('El id del alumno es undefined');
      Swal.fire('Error', 'No se pudo eliminar el alumno, ID no válido', 'error');
    }
  }



}
