import { Component, OnInit } from '@angular/core';

import { IndexServicesService } from '../../services/index-service.service';
import {RouterLink} from '@angular/router';
import {DetalleMatricula} from '../../models/DetalleMatricula';
import {DetallematriculaserviceService} from '../../detallematricula/detallematriculaservice.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HorariogrupoService} from '../../horariogrupo/horariogrupo.service';
import {HorarioGrupo} from '../../models/HorarioGrupo';
@Component({
  selector: 'app-index-component',
  imports: [CommonModule, FormsModule,
    RouterLink
  ],
  templateUrl: './index-component.html',
  styleUrl: 'index-component.css'
})
export  class IndexComponent implements OnInit{
  // Variables para almacenar las estadísticas
  alumnos: number = 0;
  cursos: number = 0;
  docentes: number = 0;
  matriculas: number = 0;
  detalleMatriculas: DetalleMatricula[] = [];
  constructor(private indexService: IndexServicesService, private detalleService: DetallematriculaserviceService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.detalleService.listarDetalleMatricula().subscribe(data => {
      this.detalleMatriculas = data;
    });
  }

  cargarEstadisticas(): void {
    this.indexService.obtenerEstadisticas().subscribe({
      next: (data) => {
        // Asignar los datos a las variables
        this.alumnos = data.alumnos;
        this.cursos = data.cursos;
        this.docentes = data.docentes;
        this.matriculas = data.matriculas;
      },
      error: (err) => {
        console.error('Error al cargar las estadísticas', err);
      }
    });
  }

}
