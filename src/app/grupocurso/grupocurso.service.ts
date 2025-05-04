import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GrupoCurso} from '../models/GrupoCurso';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupocursoService {
  private baseURL = "http://localhost:8080"

  constructor(private http:HttpClient) { }
  listarGrupoCurso(): Observable<GrupoCurso[]> {
    return this.http.get<GrupoCurso[]>(this.baseURL + '/grupocurso/listar'); // ajusta la ruta si es distinta
  }
  registrar(bean:GrupoCurso){
    return  this.http.post<GrupoCurso>(this.baseURL + '/grupocurso/registrar', bean)
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/grupocurso/eliminar/${id}`);
  }

  // Actualizar grupoCurso
  actualizar(idGrupo: number, grupocurso: any): Observable<GrupoCurso> {
    return this.http.put<GrupoCurso>(`${this.baseURL}/grupocurso/actualizar/${idGrupo}`, grupocurso);
  }

  listarCursos(): Observable<any> {
    return this.http.get('http://localhost:8080/cursos/listar');
  }

  listarDocentes(): Observable<any> {
    return this.http.get('http://localhost:8080/docentes/listar');
  }

}
