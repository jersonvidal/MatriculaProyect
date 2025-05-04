import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Curso} from '../models/Curso';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosServiceService {
  private baseURL = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Curso[]>(this.baseURL + '/cursos/listar')
  }
  registrar(bean:Curso){
    return this.http.post<Curso>(this.baseURL + '/cursos/registrar', bean)
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/cursos/eliminar/${id}`);
  }

  // Actualizar alumno
  actualizar(id: number, bean: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseURL}/cursos/actualizar/${id}`, bean);
  }
}
