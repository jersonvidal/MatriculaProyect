import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Docente } from '../models/Docente';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteServiceService {
  private baseURL = "http://localhost:8080"
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Docente[]>(this.baseURL + '/docentes/listar')
  }
  registrar(bean:Docente){
    return this.http.post<Docente>(this.baseURL + '/docentes/registrar', bean)
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/docentes/eliminar/${id}`);
  }

  // Actualizar Docente
  actualizar(id: number, bean: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.baseURL}/docentes/actualizar/${id}`, bean);
  }
}
