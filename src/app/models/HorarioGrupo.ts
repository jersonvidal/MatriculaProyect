
import {GrupoCurso} from './GrupoCurso';
export interface HorarioGrupo{
  idHorario: number
  diaSemana: string
  horaInicio: string
  horaFin: string
  aula: string
  grupoCurso: Partial<GrupoCurso> & { idGrupo: number }; // ✅ Aquí el cambio
}
