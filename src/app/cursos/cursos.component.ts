import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Curso} from '../models/Curso';
import {CursosServiceService} from '../services/cursos-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule,FormsModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];

  codigo: string = '';
  nombre: string = '';
  creditos: number = 0;

  cursoSeleccionado: any ={
    idCurso:  0,
    codigo: '',
    nombre:'',
    creditos:0
  };

  constructor(private servicioCursos: CursosServiceService) {
  }
  ngOnInit() : void {
      this.cargarCursos();
  }

  cargarCursos(): void{
    this.servicioCursos.listar().subscribe({
      next:(data) => this.cursos = data,
      error: (err) => console.error("Error al listar cursos")
    });
  }

  registrarCurso(): void{
    const nuevoCurso : Omit<Curso, 'idCurso'> = {
      codigo: this.codigo,
      nombre: this.nombre,
      creditos: this.creditos
    };

    this.servicioCursos.registrar(nuevoCurso).subscribe({
      next:(resp)=>{
        console.log('Curso registrado:', resp);
        Swal.fire('Éxito', 'Curso registrado correctamente', 'success').then(() => {
        });        this.cargarCursos(); // Recargar la lista
        // Limpiar campos
        this.codigo = '';
        this.nombre = '';
        this.creditos = 0;
      },
      error: (err) => {
        console.error('Error al registrar curso', err);
        Swal.fire('Error', 'No se pudo registrar el curso', 'error'); // Mostrar SweetAlert en caso de error
      }
    });
  }
  seleccionarCurso(curso: Curso): void{
    this.cursoSeleccionado = {...curso};
  }

  cancelarActualizacion(): void{
    this.cursoSeleccionado = {idCurso: 0, codigo: '', nombre:'', creditos: 0}
  }

  actualizarCurso(): void{
    this.servicioCursos.actualizar(this.cursoSeleccionado.idCurso, this.cursoSeleccionado).subscribe({
      next: (resp) => {
        console.log('Curso actualizado:', resp);
        Swal.fire('Éxito', 'Curso actualizado correctamente', 'success');
        this.cargarCursos(); // Refrescar lista
        this.cancelarActualizacion(); // Limpiar formulario
      },
      error: (err) => {
        console.error('Error al actualizar curso', err);
        Swal.fire('Error', 'No se pudo actualizar el curso', 'error');
      }
    });
  }

  eliminarCurso(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al Curso permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicioCursos.eliminar(id).subscribe({
            next: (response) => {
              Swal.fire('Éxito', 'Curso eliminado correctamente', 'success');
              this.cargarCursos(); // Recargar la lista
            },
            error: (err) => {
              console.error('Error al eliminar Curso', err);
              Swal.fire('Error', 'No se pudo eliminar el Curso', 'error');
            }
          });
        }
      });
    } else {
      console.error('El id del Curso es undefined');
      Swal.fire('Error', 'No se pudo eliminar el Curso, ID no válido', 'error');
    }
  }

}
