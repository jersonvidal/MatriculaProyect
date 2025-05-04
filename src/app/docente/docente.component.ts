import {Component, OnInit} from '@angular/core';
import {Docente} from '../models/Docente';
import {DocenteServiceService} from './docenteservice.service';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-docente',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  docentes: Docente[] = [];

  // Campos del formulario para registrar
  nombre: string = '';
  apellido: string = '';
  especialidad: string = '';

  docenteSeleccionado: any = {
    idDocente: 0,
    nombre: '',
    apellido: '',
    especialidad: '',
  };

  constructor(private servicioDocente: DocenteServiceService) {
  }

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes(): void {
    this.servicioDocente.listar().subscribe({
      next: (data) => this.docentes = data,
      error: (err) => console.error('Error al listar docentes', err)
    });
  }

  registrarDocente(): void {
    const nuevoDocente: Omit<Docente, 'idDocente'> = {
      nombre: this.nombre,
      apellido: this.apellido,
      especialidad: this.especialidad,
    };

    this.servicioDocente.registrar(nuevoDocente).subscribe({
      next: (resp) => {
        console.log('Docente registrado:', resp);
        Swal.fire('Éxito', 'Docente registrado correctamente', 'success').then(() => {
        });        this.cargarDocentes(); // Recargar la lista
        // Limpiar campos
        this.nombre = '';
        this.apellido = '';
        this.especialidad = '';
      },
      error: (err) => {
        console.error('Error al registrar Docente', err);
        Swal.fire('Error', 'No se pudo registrar el Docente', 'error'); // Mostrar SweetAlert en caso de error
      }
    });
  }

  // Seleccionar Docente para edición
  seleccionarDocente(docente: Docente): void {
    this.docenteSeleccionado = {...docente}; // Copiar el objeto
  }

// Cancelar edición
  cancelarActualizacion(): void {
    this.docenteSeleccionado = {iddocente: 0, nombres: '', apellidos: '', dni: '', correo: ''};
  }

// Actualizar docente
  actualizarDocente(): void {
    this.servicioDocente.actualizar(this.docenteSeleccionado.idDocente, this.docenteSeleccionado).subscribe({
      next: (resp) => {
        console.log('Docente actualizado:', resp);
        Swal.fire('Éxito', 'Docente actualizado correctamente', 'success');
        this.cargarDocentes(); // Refrescar lista
        this.cancelarActualizacion(); // Limpiar formulario
      },
      error: (err) => {
        console.error('Error al actualizar Docente', err);
        Swal.fire('Error', 'No se pudo actualizar el Docente', 'error');
      }

    });
  }

// Eliminar Docente
  eliminarDocente(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al Docente permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicioDocente.eliminar(id).subscribe({
            next: (response) => {
              Swal.fire('Éxito', 'Docente eliminado correctamente', 'success');
              this.cargarDocentes(); // Recargar la lista
            },
            error: (err) => {
              console.error('Error al eliminar Docente', err);
              Swal.fire('Error', 'No se pudo eliminar el Docente', 'error');
            }
          });
        }
      });
    } else {
      console.error('El id del Docente es undefined');
      Swal.fire('Error', 'No se pudo eliminar el Docente, ID no válido', 'error');
    }
  }
}
