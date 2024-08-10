import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { TutorRoutingModule } from "./tutor-routing.module";

import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

import { TutorComponent } from "./tutor.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './margenes/footer/footer.component';
import { HeaderComponent } from './margenes/header/header.component';
import { NotificacionesComponent } from './margenes/header/components/notificaciones/notificaciones.component';
import { OpcionesPerfilComponent } from './margenes/header/components/opciones-perfil/opciones-perfil.component';
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { CardResumenComponent } from './dashboard/components/card-resumen/card-resumen.component';
import { CursoAlumnoTutorComponent } from './curso-alumno-tutor/curso-alumno-tutor.component';
import { CalificacionesAlumnoTutorComponent } from './calificaciones-alumno-tutor/calificaciones-alumno-tutor.component';
import { PerfilTutorComponent } from './perfil-tutor/perfil-tutor.component';
import { ActividadesCursoAlumnoTutorComponent } from './curso-alumno-tutor/actividades-curso-alumno-tutor/actividades-curso-alumno-tutor.component';
import { ResumenCursoAlumnoTutorComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/resumen-curso-alumno-tutor.component';
import { CalendarioResumenCursoComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/components/calendario-resumen-curso/calendario-resumen-curso.component';
import { DashboardService } from "./service/dashboard.service";
import { CursoAlumnoTutorService } from "./service/curso-alumno-tutor.service";
import { EditPerfilTutorComponent } from './perfil-tutor/components/edit-perfil-tutor/edit-perfil-tutor.component';
import { PerfilTutorService } from "./service/perfil-tutor.service";
import { OverviewPerfilTutorComponent } from './perfil-tutor/components/overview-perfil-tutor/overview-perfil-tutor.component';
import { PasswordPerfilTutorComponent } from './perfil-tutor/components/password-perfil-tutor/password-perfil-tutor.component';
import { CalificacionesAlumnoTutorService } from "./service/calificaciones-alumno-tutor.service";
import { ActividadesCursoAlumnoTutorService } from "./service/actividades-curso-alumno-tutor.service";
import { PublicModule } from "../public/public.module";
import { VistaEstudianteComponent } from './vista-estudiante/vista-estudiante.component';
import { VistaEstudianteService } from "./service/vista-estudiante.service";
import { ContenidoVistaEstudianteComponent } from './vista-estudiante/components/contenido-vista-estudiante/contenido-vista-estudiante.component';
import { CalificacionesVistaEstudianteComponent } from './calificaciones-vista-estudiante/calificaciones-vista-estudiante.component';
import { CalificacionesVistaEstudianteService } from "./service/calificaciones-vista-estudiante.service";
import { FullCalendarModule } from "@fullcalendar/angular";
import { TematutoresService } from "./service/tematutores.service";
import { TutorialComponent } from './tutorial/tutorial.component';
import { PagosComponent } from './pagos/pagos.component';
import { ErroresComponent } from './margenes/header/components/errores/errores.component';
import { NotificacionesMensajesComponent } from './notificaciones-mensajes/notificaciones-mensajes.component';
import { NotificacionesTutorService } from "./service/notificaciones-tutor.service";
@NgModule({
  imports:[
    TutorRoutingModule,
    SharedModule,
    PublicModule,
    FullCalendarModule
  ],
  declarations:[
    TutorComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    NotificacionesComponent,
    OpcionesPerfilComponent,
    SidebarComponent,
    OpcionesMenuComponent,
    CardResumenComponent,
    CursoAlumnoTutorComponent,
    CalificacionesAlumnoTutorComponent,
    PerfilTutorComponent,
    ActividadesCursoAlumnoTutorComponent,
    ResumenCursoAlumnoTutorComponent,
    CalendarioResumenCursoComponent,
    EditPerfilTutorComponent,
    OverviewPerfilTutorComponent,
    PasswordPerfilTutorComponent,
    VistaEstudianteComponent,
    ContenidoVistaEstudianteComponent,
    CalificacionesVistaEstudianteComponent,
    TutorialComponent,
    PagosComponent,
    ErroresComponent,
    NotificacionesMensajesComponent,
  ],
  exports:[
  ],
  providers:[
    AuthGuard,
    RolesGuard,
    DashboardService,
    CursoAlumnoTutorService,
    CalificacionesAlumnoTutorService,
    PerfilTutorService,
    ActividadesCursoAlumnoTutorService,
    VistaEstudianteService,
    CalificacionesVistaEstudianteService,
    TematutoresService,
    NotificacionesTutorService
  ]
})

export class TutorModule{
  constructor(){}
}
