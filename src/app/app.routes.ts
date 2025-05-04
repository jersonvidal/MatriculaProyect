import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'index',
        loadComponent: () => import('./pages/Index/index-component').then(m => m.IndexComponent)
      },
      {
        path: 'listar',
        loadComponent: () => import('./pages/alumnos/lista-alumnos/lista-alumnos.component').then(m => m.ListaAlumnosComponent)
      },
      {
        path: 'cursos',
        loadComponent: () => import('./cursos/cursos.component').then(m => m.CursosComponent)
      },
      {
        path: 'docentes',
        loadComponent: () => import('./docente/docente.component').then(m => m.DocenteComponent)
      },
      {
        path: 'grupocurso',
        loadComponent: () => import('./grupocurso/grupocurso.component').then(m => m.GrupocursoComponent)
      },
      {
        path: 'horariogrupo',
        loadComponent: ()=> import('./horariogrupo/horariogrupo.component').then(m => m.HorariogrupoComponent)
      },
      {
        path: 'detallematricula',
        loadComponent: ()=> import('./detallematricula/detallematricula.component').then(m => m.DetallematriculaComponent)
      },
      {
        path: 'matricula',
        loadComponent: ()=> import('./matricula/matricula.component').then(m => m.MatriculaComponent)
      },
      {
        path: 'detallematricula/:idMatricula',
        loadComponent: () => import('./detallematricula/detallematricula.component').then(m => m.DetallematriculaComponent)
      }
    ]
  }
];
