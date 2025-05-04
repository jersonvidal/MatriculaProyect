import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioGrupo } from '../models/HorarioGrupo';

@Injectable({
  providedIn: 'root'
})
export class HorariogrupoService {
  private baseURL = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  listar(): Observable<HorarioGrupo[]> {
    return this.http.get<HorarioGrupo[]>(this.baseURL + '/horario/listar');
  }

  registrar(bean: HorarioGrupo){
    return this.http.post<HorarioGrupo>(this.baseURL + '/horario/registrar', bean);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/horario/eliminar/${id}`);
  }

  actualizar(idHorario: number, horario: any): Observable<any> {
    return this.http.put(`${this.baseURL}/horario/actualizar`, horario, { responseType: 'text' });
  }
  getHorariosByGrupo(idGrupo: number): Observable<HorarioGrupo[]> {
    return this.http.get<HorarioGrupo[]>(`${this.baseURL}/horario/buscar-por-grupo/${idGrupo}`);
  }

  listarGrupoCurso(): Observable<any> {
    return this.http.get(this.baseURL + '/grupocurso/listar');
  }
}
