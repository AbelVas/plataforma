import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CursosProfesorComponent } from "./cursos-profesor/cursos-profesor.component";
import { GradoGuiaProfesorComponent } from "./grado-guia-profesor/grado-guia-profesor.component";
import { PerfilProfesorComponent } from "./perfil-profesor/perfil-profesor.component";
import { CursosComponent } from "./cursos/cursos.component";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { CalendarioProfesorComponent } from "./calendario-profesor/calendario-profesor.component";
import { ForoCursoProfesorComponent } from "./foro-curso-profesor/foro-curso-profesor.component";
import { ExamenCursoProfesorComponent } from "./examen-curso-profesor/examen-curso-profesor.component";
import { ActividadCursoProfesorComponent } from "./actividad-curso-profesor/actividad-curso-profesor.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component: ProfesorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' }, component:DashboardComponent},
    {path:'cursos',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:CursosComponent},
    {path:'grado-guia',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:GradoGuiaProfesorComponent},
    {path:'calendario',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:CalendarioProfesorComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:PerfilProfesorComponent},
    {path:'curso/:id',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' }, component:CursosProfesorComponent},
    {path:'curso/foro',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:ForoCursoProfesorComponent},
    {path:'curso/actividad',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:ActividadCursoProfesorComponent},
    {path:'curso/examen',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:ExamenCursoProfesorComponent}

  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesorRoutingModule{}
