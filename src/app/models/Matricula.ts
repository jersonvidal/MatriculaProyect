import {Alumno} from './Alumno';

export interface Matricula {
  idMatricula: number | null;
  alumno: Alumno;
  fechaMatricula: string;
}
