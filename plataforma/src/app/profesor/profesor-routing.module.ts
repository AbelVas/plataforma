import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CursosProfesorComponent } from "./cursos-profesor/cursos-profesor.component";
import { ForoProfesorComponent } from "./foro-profesor/foro-profesor.component";
import { PlanificacionesProfesorComponent } from "./planificaciones-profesor/planificaciones-profesor.component";
import { GradoGuiaProfesorComponent } from "./grado-guia-profesor/grado-guia-profesor.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";


const routes:Routes=[
  {path:'',component: ProfesorComponent,canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '2' },children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'contenido/curso', component:CursosProfesorComponent},
    {path:'contenido/foro',component:ForoProfesorComponent},
    {path:'cotenido/planificaciones',component:PlanificacionesProfesorComponent},
    {path:'cotenido/grado-guia',component:GradoGuiaProfesorComponent},
    {path:'cotenido/prueba-profesores',component:ConfigBasicasComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesorRoutingModule{}
