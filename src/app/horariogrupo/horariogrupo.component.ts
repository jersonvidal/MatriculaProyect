import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HorarioGrupo } from '../models/HorarioGrupo';
import { HorariogrupoService } from './horariogrupo.service';
import { GrupoCurso } from '../models/GrupoCurso';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-horariogrupo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horariogrupo.component.html',
  styleUrls: ['./horariogrupo.component.css']
})
export class HorariogrupoComponent implements OnInit {
  horarios: HorarioGrupo[] = [];
  grupoCursos: GrupoCurso[] = [];

  // Objeto para el formulario
  horario: HorarioGrupo = {
    idHorario: 0,
    diaSemana: '',
    horaInicio: '',
    horaFin: '',
    aula: '',
    grupoCurso: { idGrupo: 0 }
  };
  esEdicion: boolean = false;

  constructor(private service: HorariogrupoService) {}

  ngOnInit(): void {
    this.listarHorarios();
    this.service.listarGrupoCurso().subscribe(data => this.grupoCursos = data);
  }

  listarHorarios(): void {
    this.service.listar().subscribe((data) => {
      this.horarios = data;
    });
  }

  registrar(form: NgForm): void {
    const horarioParaEnviar: any = {
      diaSemana: this.horario.diaSemana,
      horaInicio: this.horario.horaInicio,
      horaFin: this.horario.horaFin,
      aula: this.horario.aula,
      grupoCurso: { idGrupo: this.horario.grupoCurso.idGrupo }
    };

    this.service.registrar(horarioParaEnviar).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'El horario ha sido registrado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });      this.resetForm(form);
      this.listarHorarios();
    });
  }
  abrirModalRegistrar(form: NgForm): void {
    this.resetForm(form);
    this.esEdicion = false;
    const modal = new bootstrap.Modal(document.getElementById('modalHorario')!);
    modal.show();
  }
  editar(horario: any): void {
    this.horario = { ...horario };
    this.esEdicion = true;
    const modal = new bootstrap.Modal(document.getElementById('modalHorario')!);
    modal.show();
  }

  actualizar(form: NgForm): void {
    const id = this.horario.idHorario;

    const horarioParaEnviar: any = {
      idHorario: this.horario.idHorario,
      diaSemana: this.horario.diaSemana,
      horaInicio: this.horario.horaInicio,
      horaFin: this.horario.horaFin,
      aula: this.horario.aula,
      grupoCurso: { idGrupo: this.horario.grupoCurso.idGrupo }
    };

    this.service.actualizar(id, horarioParaEnviar).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El horario ha sido actualizado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.resetForm(form);
      this.listarHorarios();
      this.esEdicion = false;
    });
  }
  resetForm(form: NgForm): void {
    form.resetForm();
    this.horario = {
      idHorario: 0,
      diaSemana: '',
      horaInicio: '',
      horaFin: '',
      aula: '',
      grupoCurso: { idGrupo: 0 }
    };
  }
  eliminar(idHorario: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(idHorario).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El horario ha sido eliminado correctamente.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.listarHorarios();
        });
      }
    });
  }

}
