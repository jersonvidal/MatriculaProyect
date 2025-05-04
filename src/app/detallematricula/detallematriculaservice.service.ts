import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoCurso} from '../models/GrupoCurso';
import {DetalleMatricula} from '../models/DetalleMatricula';
import {Matricula} from '../models/Matricula';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DetallematriculaserviceService {
  private baseURL = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  listarDetalleMatricula(): Observable<DetalleMatricula[]> {
    return this.http.get<DetalleMatricula[]>(this.baseURL + '/detallematricula/listar'); // ajusta la ruta si es distinta
  }
  registrar(bean:DetalleMatricula): Observable<any>{
    return this.http.post<DetalleMatricula>(this.baseURL + '/detallematricula/registrar', bean)

  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/detallematricula/eliminar/${id}`);
  }

  // Actualizar grupoCurso
  actualizar(idDetalle: number, detallematricula: any): Observable<DetalleMatricula> {
    return this.http.put<DetalleMatricula>(`${this.baseURL}/detallematricula/actualizar/${idDetalle}`, detallematricula);
  }

  listarGrupoCurso(): Observable<any> {
    return this.http.get('http://localhost:8080/grupocurso/listar');
  }

  listarMatricula(): Observable<any> {
    return this.http.get('http://localhost:8080/matricula/listar');
  }
  obtenerDetallesPorMatricula(id: number): Observable<DetalleMatricula[]> {
    return this.http.get<DetalleMatricula[]>(`${this.baseURL}/detallematricula/matricula/${id}`);
  }
}
