import {Component, OnInit} from '@angular/core';
import {GrupoCurso} from '../models/GrupoCurso';
import {GrupocursoService} from './grupocurso.service';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {DetalleMatricula} from '../models/DetalleMatricula';
declare var bootstrap: any;

@Component({
  selector: 'app-grupocurso',
  imports: [CommonModule, FormsModule],
  templateUrl: './grupocurso.component.html',
  styleUrl: './grupocurso.component.css'
})
export class GrupocursoComponent implements OnInit{
  grupoCursos: GrupoCurso[] = [];

  grupoCurso: GrupoCurso =
    {
      idGrupo: 0,
    curso: { idCurso:  0, codigo: '', nombre:'', creditos: 0},
    docente: { idDocente: 0, nombre: '', apellido: '', especialidad: '' },
    semestre: '',
    anio: new Date().getFullYear(),
    turno: '',
    modalidad: ''
  };
  cursos: any[] = [];
  docentes: any[] = [];
  esEdicion: boolean = false;



  constructor(private service: GrupocursoService) {}
  ngOnInit(): void {
    this.listarGrupoCurso();
    this.service.listarCursos().subscribe(data => this.cursos = data);
    this.service.listarDocentes().subscribe(data => this.docentes = data);
  }
  listarGrupoCurso() {
    this.service.listarGrupoCurso().subscribe((data) => {
      this.grupoCursos = data;
    });
  }
  /*
  registrar(): void {
    this.service.registrar(this.grupoCurso).subscribe(() => {
      alert('Grupo curso registrado correctamente');
      this.grupoCurso = {
        curso: { idCurso: 0, codigo: '', nombre:'',creditos:0 },
        docente: { idDocente: 0, nombre: '', apellido: '', especialidad: '' },
        semestre: '',
        anio: new Date().getFullYear(),
        turno: '',
        modalidad: ''
      };
    });
  }
    */

  registrar(form: NgForm): void {
    this.grupoCurso.idGrupo = null;
    this.grupoCurso.anio = 2025;

    this.service.registrar(this.grupoCurso).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'El grupo de curso ha sido registrado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.resetForm(form);
      this.listarGrupoCurso();


    });
  }
  abrirModalRegistrar(form: NgForm): void {
    this.resetForm(form);
    this.esEdicion = false;
    const modal = new bootstrap.Modal(document.getElementById('modalGrupoCurso')!);
    modal.show();
  }
  editar(grupoCurso: GrupoCurso): void {
    this.grupoCurso = { ...grupoCurso };
    this.esEdicion = true;
    const modal = new bootstrap.Modal(document.getElementById('modalGrupoCurso')!);
    modal.show();
  }

  actualizar(form: NgForm): void {
    const id = this.grupoCurso.idGrupo;

    if (id === undefined) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El ID del grupo de curso es inválido.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
      return; // Detener la ejecución si el id es undefined.
    }

    const grupoCursoParaEnviar: any = {
      curso: { idCurso: this.grupoCurso.curso.idCurso },
      docente: { idDocente: this.grupoCurso.docente.idDocente },
      semestre: this.grupoCurso.semestre,
      anio: this.grupoCurso.anio,
      turno: this.grupoCurso.turno,
      modalidad: this.grupoCurso.modalidad
    };
   if(id!= null){
    this.service.actualizar(id, grupoCursoParaEnviar).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El grupo de curso ha sido actualizado correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.resetForm(form);
      this.listarGrupoCurso();
      this.esEdicion = false;
    });
   }
   else{
     console.error("El ID es null y no se puede actualizar")
   }
  }

  eliminar(idGrupo: number): void {
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
        this.service.eliminar(idGrupo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El horario ha sido eliminado correctamente.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.listarGrupoCurso();
        });
      }
    });
  }







  resetForm(form: NgForm): void {
    form.resetForm();
    this.grupoCurso = {
      idGrupo: 0,
      curso: { idCurso: 0, codigo: '', nombre: '', creditos: 0 },
      docente: { idDocente: 0, nombre: '', apellido: '', especialidad: '' },
      semestre: '',
      anio: new Date().getFullYear(),
      turno: '',
      modalidad: ''
    };
  }

}
