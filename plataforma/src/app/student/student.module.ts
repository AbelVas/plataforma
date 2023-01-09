import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { StudentRoutingModule } from "./student-routing.module";

import {StudentComponent} from "./student.component"
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './margenes/footer/footer.component';
import { HeaderComponent } from './margenes/header/header.component';
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { NotificacionesComponent } from './margenes/header/components/notificaciones/notificaciones.component';
import { OpcionesPerfilComponent } from './margenes/header/components/opciones-perfil/opciones-perfil.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { CardResumenStudentComponent } from './dashboard/components/card-resumen-student/card-resumen-student.component';
import { ColumnaDerechaStudentComponent } from './dashboard/components/columna-derecha-student/columna-derecha-student.component';
import { CursosStudentComponent } from './dashboard/components/cursos-student/cursos-student.component';
import { CalendarioStudentComponent } from './calendario-student/calendario-student.component';
import { CalificacionesStudentComponent } from './calificaciones-student/calificaciones-student.component';
import { CursoAlumnoComponent } from './curso-alumno/curso-alumno.component';
import { PerfilStudentComponent } from './perfil-student/perfil-student.component';
import { ActividadesCursoAlumnoComponent } from './curso-alumno/actividades-curso-alumno/actividades-curso-alumno.component';
import { CalificacionesCursoAlumnoComponent } from './curso-alumno/calificaciones-curso-alumno/calificaciones-curso-alumno.component';
import { ResumenCursoAlumnoComponent } from './curso-alumno/resumen-curso-alumno/resumen-curso-alumno.component';
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { CursoAlumnoService } from "./curso-alumno/services/curso-alumno.service";
import { CalendarioStudentService } from "./calendario-student/services/calendario-student.service";
import { ActividadesCursoAlumnoService } from "./curso-alumno/actividades-curso-alumno/services/actividades-curso-alumno.service";
import { CardInfoResumenComponent } from './curso-alumno/resumen-curso-alumno/components/card-info-resumen/card-info-resumen.component';
import { CalendarioResumenCursoComponent } from './curso-alumno/resumen-curso-alumno/components/calendario-resumen-curso/calendario-resumen-curso.component';
import { ProgressResumenCursoComponent } from './curso-alumno/resumen-curso-alumno/components/progress-resumen-curso/progress-resumen-curso.component';
import { AnunciosRecursosResumenCursoComponent } from './curso-alumno/resumen-curso-alumno/components/anuncios-recursos-resumen-curso/anuncios-recursos-resumen-curso.component';
import { AnunciosResumenCursoComponent } from './curso-alumno/resumen-curso-alumno/components/anuncios-recursos-resumen-curso/components/anuncios-resumen-curso/anuncios-resumen-curso.component';
import { RecursosResumenCursoComponent } from './curso-alumno/resumen-curso-alumno/components/anuncios-recursos-resumen-curso/components/recursos-resumen-curso/recursos-resumen-curso.component';
import { AnunciosRecursosResumenCursoService } from "./curso-alumno/resumen-curso-alumno/components/anuncios-recursos-resumen-curso/services/anuncios-recursos-resumen-curso.service";
import { ResumenCursoAlumnoService } from "./curso-alumno/resumen-curso-alumno/services/resumen-curso-alumno.service";
import { DahboardService } from "./dashboard/services/dahboard.service";
import { PerfilAlumnoService } from "./perfil-student/services/perfil-alumno.service";
import { EditPerfilAlumnoComponent } from "./perfil-student/components/edit-perfil-alumno/edit-perfil-alumno.component";
import { OverviewPerfilAlumnoComponent } from "./perfil-student/components/overview-perfil-alumno/overview-perfil-alumno.component";
import { PasswordPerfilAlumnoComponent } from "./perfil-student/components/password-perfil-alumno/password-perfil-alumno.component";
import { ForoCursoStudentComponent } from './foro-curso-student/foro-curso-student.component';
import { ActividadCursoStudentComponent } from './actividad-curso-student/actividad-curso-student.component';
import { ExamenCursoStudentComponent } from './examen-curso-student/examen-curso-student.component';
import { ForoCursoStudentService } from "./foro-curso-student/services/foro-curso-student.service";
import { ActividadCursoStudentService } from "./actividad-curso-student/services/actividad-curso-student.service";
import { ExamenCursoStudentService } from "./examen-curso-student/examen-curso-student.service";
import { CalificacionesStudentService } from "./calificaciones-student/services/calificaciones-student.service";
import { PublicModule } from "../public/public.module";
import { FullCalendarModule } from "@fullcalendar/angular";
//


@NgModule({
  imports:[
    StudentRoutingModule,
    SharedModule,
    PublicModule,
    FullCalendarModule
  ],
  declarations:[
    StudentComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    NotificacionesComponent,
    OpcionesPerfilComponent,
    OpcionesMenuComponent,
    CardResumenStudentComponent,
    ColumnaDerechaStudentComponent,
    CursosStudentComponent,
    CalendarioStudentComponent,
    CalificacionesStudentComponent,
    CursoAlumnoComponent,
    PerfilStudentComponent,
    ActividadesCursoAlumnoComponent,
    CalificacionesCursoAlumnoComponent,
    ResumenCursoAlumnoComponent,
    CardInfoResumenComponent,
    CalendarioResumenCursoComponent,
    ProgressResumenCursoComponent,
    AnunciosRecursosResumenCursoComponent,
    AnunciosResumenCursoComponent,
    RecursosResumenCursoComponent,
    EditPerfilAlumnoComponent,
    OverviewPerfilAlumnoComponent,
    PasswordPerfilAlumnoComponent,
    ForoCursoStudentComponent,
    ActividadCursoStudentComponent,
    ExamenCursoStudentComponent
  ],
  exports:[
  ],
  providers:[
    AuthGuard,
    RolesGuard,
    CursoAlumnoService,
    CalendarioStudentService,
    ActividadesCursoAlumnoService,
    AnunciosRecursosResumenCursoService,
    ResumenCursoAlumnoService,
    DahboardService,
    PerfilAlumnoService,
    ForoCursoStudentService,
    ActividadCursoStudentService,
    ExamenCursoStudentService,
    CalificacionesStudentService

  ]
})

export class StudentModule{
  constructor(){}
}

