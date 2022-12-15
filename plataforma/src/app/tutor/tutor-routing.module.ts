import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { TutorComponent } from "./tutor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CalificacionesAlumnoTutorComponent } from "./calificaciones-alumno-tutor/calificaciones-alumno-tutor.component";
import { ActividadesCursoAlumnoTutorComponent } from "./curso-alumno-tutor/actividades-curso-alumno-tutor/actividades-curso-alumno-tutor.component";
import { CalificacionesCursoAlumnoTutorComponent } from "./curso-alumno-tutor/calificaciones-curso-alumno-tutor/calificaciones-curso-alumno-tutor.component";
import { ResumenCursoAlumnoTutorComponent } from "./curso-alumno-tutor/resumen-curso-alumno-tutor/resumen-curso-alumno-tutor.component";
import { PerfilTutorComponent } from "./perfil-tutor/perfil-tutor.component";

import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component: TutorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:DashboardComponent},
    {path:'calificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:CalificacionesAlumnoTutorComponent},
    {path:'curso/actividades',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:ActividadesCursoAlumnoTutorComponent},
    {path:'curso/calificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:CalificacionesCursoAlumnoTutorComponent},
    {path:'curso/resumen',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:ResumenCursoAlumnoTutorComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:PerfilTutorComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorRoutingModule{}
