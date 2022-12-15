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
import { CardClasesComponent } from './dashboard/components/card-clases/card-clases.component';
import { CursoAlumnoTutorComponent } from './curso-alumno-tutor/curso-alumno-tutor.component';
import { CalificacionesAlumnoTutorComponent } from './calificaciones-alumno-tutor/calificaciones-alumno-tutor.component';
import { PerfilTutorComponent } from './perfil-tutor/perfil-tutor.component';
import { ActividadesCursoAlumnoTutorComponent } from './curso-alumno-tutor/actividades-curso-alumno-tutor/actividades-curso-alumno-tutor.component';
import { ResumenCursoAlumnoTutorComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/resumen-curso-alumno-tutor.component';
import { CalificacionesCursoAlumnoTutorComponent } from './curso-alumno-tutor/calificaciones-curso-alumno-tutor/calificaciones-curso-alumno-tutor.component';
import { TareasActividadesCursoAlumnoTutorComponent } from './curso-alumno-tutor/actividades-curso-alumno-tutor/components/tareas-actividades-curso-alumno-tutor/tareas-actividades-curso-alumno-tutor.component';
import { ExamenesActividadesCursoAlumnoTutorComponent } from './curso-alumno-tutor/actividades-curso-alumno-tutor/components/examenes-actividades-curso-alumno-tutor/examenes-actividades-curso-alumno-tutor.component';
import { ForosActividadesCursoAlumnoTutorComponent } from './curso-alumno-tutor/actividades-curso-alumno-tutor/components/foros-actividades-curso-alumno-tutor/foros-actividades-curso-alumno-tutor.component';
import { CardInfoResumenComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/components/card-info-resumen/card-info-resumen.component';
import { CalendarioResumenCursoComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/components/calendario-resumen-curso/calendario-resumen-curso.component';
import { ProgressResumenCursoComponent } from './curso-alumno-tutor/resumen-curso-alumno-tutor/components/progress-resumen-curso/progress-resumen-curso.component';
import { DashboardService } from "./dashboard/services/dashboard.service";
import { CursoAlumnoTutorService } from "./curso-alumno-tutor/services/curso-alumno-tutor.service";
import { EditPerfilTutorComponent } from './perfil-tutor/components/edit-perfil-tutor/edit-perfil-tutor.component';
import { PerfilTutorService } from "./perfil-tutor/services/perfil-tutor.service";
import { OverviewPerfilTutorComponent } from './perfil-tutor/components/overview-perfil-tutor/overview-perfil-tutor.component';
import { PasswordPerfilTutorComponent } from './perfil-tutor/components/password-perfil-tutor/password-perfil-tutor.component';
import { CalificacionesAlumnoTutorService } from "./calificaciones-alumno-tutor/services/calificaciones-alumno-tutor.service";
import { ActividadesCursoAlumnoTutorService } from "./curso-alumno-tutor/actividades-curso-alumno-tutor/services/actividades-curso-alumno-tutor.service";

@NgModule({
  imports:[
    TutorRoutingModule,
    SharedModule
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
    CardClasesComponent,
    CursoAlumnoTutorComponent,
    CalificacionesAlumnoTutorComponent,
    PerfilTutorComponent,
    ActividadesCursoAlumnoTutorComponent,
    ResumenCursoAlumnoTutorComponent,
    CalificacionesCursoAlumnoTutorComponent,
    TareasActividadesCursoAlumnoTutorComponent,
    ExamenesActividadesCursoAlumnoTutorComponent,
    ForosActividadesCursoAlumnoTutorComponent,
    CardInfoResumenComponent,
    CalendarioResumenCursoComponent,
    ProgressResumenCursoComponent,
    EditPerfilTutorComponent,
    OverviewPerfilTutorComponent,
    PasswordPerfilTutorComponent
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
    ActividadesCursoAlumnoTutorService
  ]
})

export class TutorModule{
  constructor(){}
}
