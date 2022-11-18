import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CursosProfesorComponent } from "./cursos-profesor/cursos-profesor.component";
import { ForoProfesorComponent } from "./foro-profesor/foro-profesor.component";
import { PlanificacionesProfesorComponent } from "./planificaciones-profesor/planificaciones-profesor.component";
import { GradoGuiaProfesorComponent } from "./grado-guia-profesor/grado-guia-profesor.component";
import { PerfilProfesorComponent } from "./perfil-profesor/perfil-profesor.component";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component: ProfesorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' }, component:DashboardComponent},
    {path:'contenido/curso',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' }, component:CursosProfesorComponent},
    {path:'contenido/foro',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:ForoProfesorComponent},
    {path:'contenido/planificaciones',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:PlanificacionesProfesorComponent},
    {path:'contenido/grado-guia',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:GradoGuiaProfesorComponent},
    {path:'contenido/perfil-profesores',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },component:PerfilProfesorComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesorRoutingModule{}
