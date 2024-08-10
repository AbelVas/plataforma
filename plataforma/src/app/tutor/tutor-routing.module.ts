import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { TutorComponent } from "./tutor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CalificacionesAlumnoTutorComponent } from "./calificaciones-alumno-tutor/calificaciones-alumno-tutor.component";
import { ActividadesCursoAlumnoTutorComponent } from "./curso-alumno-tutor/actividades-curso-alumno-tutor/actividades-curso-alumno-tutor.component";
import { ResumenCursoAlumnoTutorComponent } from "./curso-alumno-tutor/resumen-curso-alumno-tutor/resumen-curso-alumno-tutor.component";
import { PerfilTutorComponent } from "./perfil-tutor/perfil-tutor.component";

import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { VistaEstudianteComponent } from "./vista-estudiante/vista-estudiante.component";
import { CalificacionesVistaEstudianteComponent } from "./calificaciones-vista-estudiante/calificaciones-vista-estudiante.component";
import { TutorialComponent } from "./tutorial/tutorial.component";
import { PagosComponent } from "./pagos/pagos.component";
import { NotificacionesMensajesComponent } from "./notificaciones-mensajes/notificaciones-mensajes.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component: TutorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:DashboardComponent},
    {path:'estudiante/:idEstudiante',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:VistaEstudianteComponent},
    {path:'calificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:CalificacionesAlumnoTutorComponent},
    {path:'calificaciones/:idEstudiante',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:CalificacionesVistaEstudianteComponent},
    {path:'curso/actividades',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:ActividadesCursoAlumnoTutorComponent},
    {path:'curso/resumen/:idAlumno/:idCurso',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:ResumenCursoAlumnoTutorComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '3' },component:PerfilTutorComponent},
    {path:'tutorial',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:TutorialComponent},
    {path:'pagos',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:PagosComponent},
    {path:'notificaciones',canActivate:[AuthGuard,RolesGuard],data:{expectedRole:'3'},component:NotificacionesMensajesComponent},
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorRoutingModule{}
