import {Matricula} from './Matricula';
import {GrupoCurso} from './GrupoCurso';

export interface DetalleMatricula{
    idDetalle?: number | null;
    matricula: Matricula;
    grupoCurso: GrupoCurso;
    estado: boolean;
}
