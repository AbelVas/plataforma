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
import { PlanificacionesStudentComponent } from './planificaciones-student/planificaciones-student.component';
import { CursoAlumnoComponent } from './curso-alumno/curso-alumno.component';
import { PerfilStudentComponent } from './perfil-student/perfil-student.component';
import { ActividadesCursoAlumnoComponent } from './curso-alumno/actividades-curso-alumno/actividades-curso-alumno.component';
import { CalificacionesCursoAlumnoComponent } from './curso-alumno/calificaciones-curso-alumno/calificaciones-curso-alumno.component';
import { ResumenCursoAlumnoComponent } from './curso-alumno/resumen-curso-alumno/resumen-curso-alumno.component';
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { CursoAlumnoService } from "./curso-alumno/services/curso-alumno.service";
//


@NgModule({
  imports:[
    StudentRoutingModule,
    SharedModule
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
    PlanificacionesStudentComponent,
    CursoAlumnoComponent,
    PerfilStudentComponent,
    ActividadesCursoAlumnoComponent,
    CalificacionesCursoAlumnoComponent,
    ResumenCursoAlumnoComponent,
  ],
  exports:[
  ],
  providers:[
    AuthGuard,
    RolesGuard,
    CursoAlumnoService
  ]
})

export class StudentModule{
  constructor(){}
}

