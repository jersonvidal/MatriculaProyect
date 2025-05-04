import {Docente} from './Docente';
import {Curso} from './Curso';

export interface GrupoCurso {
  idGrupo: number | null;
  curso: Curso;
  docente: Docente;
  semestre: string;
  anio: number;
  turno: string;
  modalidad: string;
}

