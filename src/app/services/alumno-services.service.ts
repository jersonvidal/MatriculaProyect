import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Alumno} from '../models/Alumno';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServicesService {
  private baseURL = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Alumno[]>(this.baseURL + '/alumnos/listar')
  }
  registrar(bean:Alumno){
    return this.http.post<Alumno>(this.baseURL + '/alumnos/registrar', bean)
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/alumnos/eliminar/${id}`);
  }

  // Actualizar alumno
  actualizar(id: number, bean: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseURL}/alumnos/actualizar/${id}`, bean);
  }
}
