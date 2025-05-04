import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {Matricula} from '../models/Matricula';
import {MatriculaserviceService} from './matriculaservice.service';
import Swal from 'sweetalert2';
import {GrupoCurso} from '../models/GrupoCurso';
import {RouterLink} from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-matricula',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})
export class MatriculaComponent implements  OnInit{
  matriculas: Matricula[] = [];

  matricula: Matricula = {
    idMatricula:0,
    alumno: { idAlumno: 0, nombres: '', apellidos: '', dni: '', correo: ''},
    fechaMatricula: ''
  };
  alumnos: any[] = [];
  esEdicion: boolean = false;

  constructor (private service: MatriculaserviceService){}
  ngOnInit() :void {
    this.listarMatricula();
    this.service.listarAlumno().subscribe(data=>this.alumnos = data);
  }

  listarMatricula() {
    this.service.listarMatricula().subscribe((data) => {
      this.matriculas = data;
    });
  }

  registrar(form: NgForm): void {
    this.service.registrar(this.matricula).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'El grupo de curso ha sido registrado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.resetForm(form);
      this.listarMatricula();


    });
  }
  abrirModalRegistrar(form: NgForm): void {
    this.resetForm(form);
    this.esEdicion = false;

    // Asignar fecha actual en formato YYYY-MM-DD
    const hoy = new Date().toISOString().substring(0, 10);
    this.matricula = {
      idMatricula: null,
      alumno: { idAlumno: null, nombres:'', apellidos:'', dni:'', correo:''},
      fechaMatricula: hoy
    };

    const modal = new bootstrap.Modal(document.getElementById('modalMatricula')!);
    modal.show();
  }
  editar(matricula: Matricula): void {
    this.matricula = { ...matricula };
    this.esEdicion = true;
    const modal = new bootstrap.Modal(document.getElementById('modalMatricula')!);
    modal.show();
  }

  actualizar(form: NgForm): void {
    const id = this.matricula.idMatricula;

    if (id === undefined) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El ID de matricula es invalido.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
      return; // Detener la ejecución si el id es undefined.
    }

    const matriculaParaEnviar: any = {
      alumno: {idAlumno: this.matricula.alumno.idAlumno},
      fechaMatricula: this.matricula.fechaMatricula
    };

    this.service.actualizar(id!, matriculaParaEnviar).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La matricula ha sido actualizada correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.resetForm(form);
      this.listarMatricula();
      this.esEdicion = false;
    });
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.matricula = {
      idMatricula: 0,
      alumno: {idAlumno: 0, nombres:'', apellidos:'', dni:'', correo:''},
      fechaMatricula: ''
    };
  }


}
