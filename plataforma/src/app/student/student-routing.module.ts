import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ActividadCursoStudentComponent } from "./actividad-curso-student/actividad-curso-student.component";
import { CalendarioStudentComponent } from "./calendario-student/calendario-student.component";
import { CalificacionesStudentComponent } from "./calificaciones-student/calificaciones-student.component";
import { ActividadesCursoAlumnoComponent } from "./curso-alumno/actividades-curso-alumno/actividades-curso-alumno.component";
import { CalificacionesCursoAlumnoComponent } from "./curso-alumno/calificaciones-curso-alumno/calificaciones-curso-alumno.component";
import { ResumenCursoAlumnoComponent } from "./curso-alumno/resumen-curso-alumno/resumen-curso-alumno.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExamenCursoStudentComponent } from "./examen-curso-student/examen-curso-student.component";
import { ForoCursoStudentComponent } from "./foro-curso-student/foro-curso-student.component";
import { PerfilStudentComponent } from "./perfil-student/perfil-student.component";
import { StudentComponent } from "./student.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component: StudentComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:DashboardComponent},
    {path:'calendario',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:CalendarioStudentComponent},
    {path:'calificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:CalificacionesStudentComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:PerfilStudentComponent},
    {path:'curso/resumen/:id/:curso',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:ResumenCursoAlumnoComponent},
    {path:'curso/actividades',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:ActividadesCursoAlumnoComponent},
    {path:'curso/calificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:CalificacionesCursoAlumnoComponent},
    {path:'foro',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:ForoCursoStudentComponent},
    {path:'actividad',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:ActividadCursoStudentComponent},
    {path:'examen',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '4' },component:ExamenCursoStudentComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule{}
