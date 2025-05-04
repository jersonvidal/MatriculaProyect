import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DetalleMatricula } from '../models/DetalleMatricula';
import { Matricula } from '../models/Matricula';
import { GrupoCurso } from '../models/GrupoCurso';
import { DetallematriculaserviceService } from './detallematriculaservice.service';
import { MatriculaserviceService } from '../matricula/matriculaservice.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-detallematricula',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added RouterLink in case you use it in the template
  templateUrl: './detallematricula.component.html',
  styleUrl: './detallematricula.component.css',
})
export class DetallematriculaComponent implements OnInit {

  detalles: DetalleMatricula[] = [];
  matriculas: Matricula[] = [];
  grupoCursos: GrupoCurso[] = [];

  // Matrícula actualmente seleccionada
  matriculaSeleccionada: Matricula | null = null;

  detalleNuevo: any = {
    matricula: {
      idMatricula: null,
      alumno: { idAlumno: null, nombres: '', apellidos: '', dni: '', correo: '' },
      fechaMatricula: ''
    },
    grupoCurso: {
      idGrupo: null,
      curso: { idCurso: null, nombre: '', creditos: 0, codigo: '' },
      docente: { idDocente: null, nombre: '', apellido: '', especialidad: '' },
      semestre: '',
      anio: new Date().getFullYear(),
      turno: '',
      modalidad: ''
    },
    estado: true
  };

  constructor(
    private service: DetallematriculaserviceService,
    private matriculaService: MatriculaserviceService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.cargarMatriculas();
    this.cargarGruposCurso();
    this.route.paramMap.subscribe(params => {
      const id = params.get('idMatricula');
      if (id) {
        this.detalleNuevo.idMatricula = Number(id);
        this.cargarDetallesMatricula();
      }
    });
  }

  cargarDetallesMatricula(): void {
    if (this.detalleNuevo.idMatricula) {
      this.service.obtenerDetallesPorMatricula(this.detalleNuevo.idMatricula).subscribe({
        next: (detalles) => {
          this.detalleNuevo.idMatricula = detalles;
          console.log('Detalles de matrícula:', detalles); // Verificación
        },
        error: (error) => {
          console.error('Error al obtener los detalles de la matrícula', error);
        }
      });
    }
  }


  cargarMatriculas(): void {
    this.matriculaService.listarMatricula().subscribe({
      next: (data) => {
        this.matriculas = data;
      },
      error: (error) => {
        console.error('Error al cargar las matrículas:', error);
        Swal.fire('Error', 'No se pudieron cargar las matrículas.', 'error');
      },
      complete: () => {
        console.log('Carga de matrículas completada');
      }
    });
  }

  cargarGruposCurso(): void {
    this.service.listarGrupoCurso().subscribe({
      next: (data) => {
        this.grupoCursos = data;
      },
      error: (error) => {
        console.error('Error al cargar los grupos de curso:', error);
        Swal.fire('Error', 'No se pudieron cargar los grupos de curso.', 'error');
      },
      complete: () => {
        // Opcional: Lógica a ejecutar cuando el observable se completa
        console.log('Carga de grupos completada');
      }
    });
  }



  seleccionarMatricula(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      const selectedId = event.target.value;
      const idMatricula = Number(selectedId);

      const encontrada = this.matriculas.find(m => m.idMatricula === idMatricula);
      if (encontrada) {
        this.matriculaSeleccionada = encontrada;
        this.listarDetallesPorMatricula(encontrada.idMatricula!); // Use the non-null assertion operator
      } else {
        this.matriculaSeleccionada = null;
        this.detalles = [];
      }
    }
  }
  get showAsignarButton(): boolean {
    // Verifica si hay detalles con un idDetalle no nulo
    return !this.detalles?.some(detalle => detalle.idDetalle != null);
  }


  listarDetallesPorMatricula(idMatricula: number): void {
    this.service.obtenerDetallesPorMatricula(idMatricula).subscribe({
      next: (data: DetalleMatricula[]) => {
        this.detalles = data;
        console.log('Detalles cargados:', this.detalles); // <--- ¡VERIFICA ESTO!

      },
      error: (error) => {
        console.error('Error al listar los detalles de la matrícula:', error);
        Swal.fire('Error', 'No se pudieron cargar los detalles de la matrícula.', 'error');
      },
      complete: () => {
        // Opcional: Lógica a ejecutar cuando el observable se completa
        console.log('Carga de detalles completada');
      }
    });
  }

  abrirModalAsignar(): void {
    if (!this.matriculaSeleccionada) {
      Swal.fire('Advertencia', 'Por favor, selecciona una matrícula primero.', 'warning');
      return;
    }
    this.inicializarDetalleNuevoParaModal();
    const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
    modal.show();
  }

  inicializarDetalleNuevoParaModal(): void {
    this.detalleNuevo = {
      matricula: { ...this.matriculaSeleccionada }, // Use the selected matrícula
      grupoCurso: { idGrupo: null },
      estado: true
    };
  }

  asignarGrupo(form: NgForm): void {
    console.log("detalleNuevo.grupoCurso.idGrupo", this.detalleNuevo.grupoCurso.idGrupo);  // Verifica el valor antes de la validación
    console.log('GrupoCurso:', this.detalleNuevo.grupoCurso);

    if (!this.detalleNuevo.grupoCurso?.idGrupo) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un grupo de curso.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const detalleParaEnviar: DetalleMatricula = {
      idDetalle: null,
      matricula: this.matriculaSeleccionada!,
      grupoCurso: {
        idGrupo: this.detalleNuevo.grupoCurso.idGrupo,
        curso: this.detalleNuevo.grupoCurso.curso,
        docente: this.detalleNuevo.grupoCurso.docente,
        semestre: this.detalleNuevo.grupoCurso.semestre ?? null,
        anio: this.detalleNuevo.grupoCurso.anio ?? null,
        turno: this.detalleNuevo.grupoCurso.turno ?? null,
        modalidad: this.detalleNuevo.grupoCurso.modalidad ?? null
      },
      estado: form.value.estado
    };

    this.service.registrar(detalleParaEnviar).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Asignación exitosa!',
          text: 'El grupo fue asignado a la matrícula.',
          confirmButtonColor: '#3085d6'
        });
        this.listarDetallesPorMatricula(this.matriculaSeleccionada!.idMatricula!);
        this.resetForm(form);
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDetalle'));
        modal?.hide();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al asignar el grupo:', error);
        Swal.fire('Error', 'No se pudo asignar el grupo.', 'error');
      }
    });
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.detalleNuevo = {
      matricula: this.matriculaSeleccionada ? { idMatricula: this.matriculaSeleccionada.idMatricula } : { idMatricula: null },
      grupoCurso: { idGrupo: null },
      estado: true
    };
  }
}
