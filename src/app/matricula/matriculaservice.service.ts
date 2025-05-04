import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoCurso} from '../models/GrupoCurso';
import {DetalleMatricula} from '../models/DetalleMatricula';
import {Matricula} from '../models/Matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaserviceService {

  private baseURL = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  listarMatricula(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.baseURL + '/matricula/listar'); // ajusta la ruta si es distinta
  }
  registrar(bean:Matricula){
    return this.http.post<Matricula>(this.baseURL + '/matricula/registrar', bean)
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/matricula/eliminar/${id}`);
  }

  actualizar(idMatricula: number, matricula: any): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.baseURL}/matricula/actualizar/${idMatricula}`, matricula);
  }

  listarAlumno(): Observable<any> {
    return this.http.get('http://localhost:8080/alumnos/listar');
  }



}
