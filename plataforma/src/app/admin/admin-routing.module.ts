import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AdminComponent } from "./admin.component";
import { CodigosComponent } from "./codigos/codigos.component";
import { ComplementosComponent } from "./complementos/complementos.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";
import { CursosComponent } from "./grados/cursos/cursos.component";
import { GradosComponent } from "./grados/grados.component";
import { ListaGradosComponent } from "./lista-grados/lista-grados.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { TutorialComponent } from "./tutorial/tutorial.component";
import { PagosComponent } from "./pagos/pagos.component";
import { ConsolidadoBimestralComponent } from "./consolidado-bimestral/consolidado-bimestral.component";
import { CuadroGuiaComponent } from "./cuadro-guia/cuadro-guia.component";
import { BoletasComponent } from "./boletas/boletas.component";
import { CuadroFinalComponent } from "./cuadro-final/cuadro-final.component";
import { BoletaEspecialComponent } from "./boleta-especial/boleta-especial.component";
import { BoletaFinalPromedioCursoComponent } from "./boleta-final-promedio-curso/boleta-final-promedio-curso.component";
import { AsignacionGradoGuiaComponent } from "./asignacion-grado-guia/asignacion-grado-guia.component";
import { NotificacionesMensajesComponent } from "./notificaciones-mensajes/notificaciones-mensajes.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component: AdminComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' }, component:IndexAdminComponent},
    {path:'settings/basic',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ConfigBasicasComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ProfileComponent},
    {path:'grado/:id',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:GradosComponent},
    {path:'grado/curso/:idGrado/:id/:idProfesor',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CursosComponent},
    {path:'codigos',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CodigosComponent},
    {path:'grados',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ListaGradosComponent},
    {path:'grados-guias',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:AsignacionGradoGuiaComponent},
    {path:'usuarios',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:UsuariosComponent},
    {path:'complementos',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ComplementosComponent},
    {path:'grado/:id/:data',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:GradosComponent},
    {path:'grados/:id',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ListaGradosComponent},
    {path:'grado/curso/:idGrado/:id/:idProfesor/:idNivelLista',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CursosComponent},
    {path:'estadistica',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:EstadisticaComponent},
    {path:'tutorial',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:TutorialComponent},
    {path:'pagos',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:PagosComponent},
    {path:'consolidado/:idGrado/:idCurso/:idProfesor',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ConsolidadoBimestralComponent},
    {path:'cuadro-guia/:idGrado',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CuadroGuiaComponent},
    {path:'cuadro-final/:idGrado',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CuadroFinalComponent},
    {path:'boletas/:idGrado/:idAlumno',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:BoletasComponent},
    {path:'boleta-especial/:idGrado/:idAlumno',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:BoletaEspecialComponent},
    {path:'boleta-especial-final/:idGrado/:idCurso/:idProfesor',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:BoletaFinalPromedioCursoComponent},
    {path:'notificaciones',canActivate:[AuthGuard,RolesGuard],data:{expectedRole:'1'},component:NotificacionesMensajesComponent},
  ]
  },
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
