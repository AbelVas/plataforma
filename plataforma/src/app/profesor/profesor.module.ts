import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { ProfesorRoutingModule } from "./profesor-routing.module";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './margenes/footer/footer.component';
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { HeaderComponent } from './margenes/header/header.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { OpcionesPerfilComponent } from "./margenes/header/components/opciones-perfil/opciones-perfil.component";
import { NotificacionesComponent } from "./margenes/header/components/notificaciones/notificaciones.component";
import { CardResumenComponent } from './dashboard/components/card-resumen/card-resumen.component';
import { CardClasesJornadasComponent } from './dashboard/components/card-clases-jornadas/card-clases-jornadas.component';
import { AllCalendarioProfesoresComponent } from './dashboard/components/all-calendario-profesores/all-calendario-profesores.component';
import { ActividadesCalificarProfesoresComponent } from './dashboard/components/actividades-calificar-profesores/actividades-calificar-profesores.component';
import { GuiaPlaniProfesoresComponent } from './dashboard/components/guia-plani-profesores/guia-plani-profesores.component';
import { ForoProfesorComponent } from './foro-profesor/foro-profesor.component';
import { PlanificacionesProfesorComponent } from './planificaciones-profesor/planificaciones-profesor.component';
import { GradoGuiaProfesorComponent } from './grado-guia-profesor/grado-guia-profesor.component';
import { CursosProfesorComponent } from './cursos-profesor/cursos-profesor.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { OverviewPerfilProfesorComponent } from './perfil-profesor/components/overview-perfil-profesor/overview-perfil-profesor.component';
import { EditPerfilProfesorComponent } from './perfil-profesor/components/edit-perfil-profesor/edit-perfil-profesor.component';
import { PasswordPerfilProfesoresComponent } from './perfil-profesor/components/password-perfil-profesores/password-perfil-profesores.component';
import { PerfilProfesorService } from "./perfil-profesor/services/perfil-profesor.service";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { MargenesProfesorService } from "./margenes/services/margenes-profesor.service";
import { ActividadesCalificarProfesorService } from "./dashboard/services/actividades-calificar-profesor.service";
import { AllCalendarioProfesoresService } from "./dashboard/services/all-calendario-profesores.service";
import { CardClasesJornadasService } from "./dashboard/services/card-clases-jornadas.service";
import { GuiaPlaniProfesoresService } from "./dashboard/services/guia-plani-profesores.service";
import { CardResumenService } from "./dashboard/services/card-resumen.service";
import { CursosComponent } from './cursos/cursos.component';
import { CursosService } from "./cursos/services/cursos.service";
import { HorarioProfesorComponent } from './dashboard/components/horario-profesor/horario-profesor.component';
import { HorarioProfesorService } from "./dashboard/services/horario-profesor.service";
import { DashboardService } from "./dashboard/services/dashboard.service";
import { PlanificacionesProfesorService } from "./planificaciones-profesor/services/planificaciones-profesor.service";
import { GradoGuiaProfesorService } from "./grado-guia-profesor/services/grado-guia-profesor.service";
import { CursosCardResumenComponent } from './cursos-profesor/components/cursos-card-resumen/cursos-card-resumen.component';
import { OpcionesCursoComponent } from './cursos-profesor/components/opciones-curso/opciones-curso.component';
import { CalendarioCursoComponent } from './cursos-profesor/components/calendario-curso/calendario-curso.component';
import { AlumnosCursoComponent } from './cursos-profesor/components/alumnos-curso/alumnos-curso.component';
import { AlumnosCursoService } from "./cursos-profesor/services/alumnos-curso.service";
import { CalendarioCursoService } from "./cursos-profesor/services/calendario-curso.service";
import { CalendarioGeneralProfesoresComponent } from './calendario-general-profesores/calendario-general-profesores.component';
import { CalendarioGeneralProfesoresService } from "./calendario-general-profesores/services/calendario-general-profesores.service";
import { GraficoGradoGuiaComponent } from './grado-guia-profesor/components/grafico-grado-guia/grafico-grado-guia.component';
import { GraficoGradoGuiaService } from "./grado-guia-profesor/services/grafico-grado-guia.service";
import { ActividadesCursoIndividualComponent } from './actividades-curso-individual/actividades-curso-individual.component';
import { ActividadCursosIndividualComponent } from './actividades-curso-individual/components/actividad-cursos-individual/actividad-cursos-individual.component';
import { CalificacionesActividadCursoIndividualComponent } from './actividades-curso-individual/components/calificaciones-actividad-curso-individual/calificaciones-actividad-curso-individual.component';
import { AlumnosActividadCursoIndividualComponent } from './actividades-curso-individual/components/alumnos-actividad-curso-individual/alumnos-actividad-curso-individual.component';
import { GraficosActividadCursoIndividualComponent } from './actividades-curso-individual/components/graficos-actividad-curso-individual/graficos-actividad-curso-individual.component';
//


@NgModule({
  imports:[
    ProfesorRoutingModule,
    SharedModule
  ],
  declarations:[
  ProfesorComponent,
  DashboardComponent,
  FooterComponent,
  SidebarComponent,
  HeaderComponent,
  OpcionesMenuComponent,
  OpcionesPerfilComponent,
  NotificacionesComponent,
  CardResumenComponent,
  CardClasesJornadasComponent,
  AllCalendarioProfesoresComponent,
  ActividadesCalificarProfesoresComponent,
  GuiaPlaniProfesoresComponent,
  ForoProfesorComponent,
  PlanificacionesProfesorComponent,
  GradoGuiaProfesorComponent,
  CursosProfesorComponent,
  PerfilProfesorComponent,
  OverviewPerfilProfesorComponent,
  EditPerfilProfesorComponent,
  PasswordPerfilProfesoresComponent,
  CursosComponent,
  HorarioProfesorComponent,
  CursosCardResumenComponent,
  OpcionesCursoComponent,
  CalendarioCursoComponent,
  AlumnosCursoComponent,
  CalendarioGeneralProfesoresComponent,
  GraficoGradoGuiaComponent,
  ActividadesCursoIndividualComponent,
  ActividadCursosIndividualComponent,
  CalificacionesActividadCursoIndividualComponent,
  AlumnosActividadCursoIndividualComponent,
  GraficosActividadCursoIndividualComponent
  ],
  exports:[
  ],
  providers:[
    PerfilProfesorService,
    DashboardService,
    AuthGuard,
    RolesGuard,
    MargenesProfesorService,
    ActividadesCalificarProfesorService,
    AllCalendarioProfesoresService,
    CardClasesJornadasService,
    CardResumenService,
    GuiaPlaniProfesoresService,
    CursosService,
    HorarioProfesorService,
    PlanificacionesProfesorService,
    GradoGuiaProfesorService,
    AlumnosCursoService,
    CalendarioCursoService,
    CursosCardResumenComponent,
    OpcionesCursoComponent,
    CalendarioGeneralProfesoresService,
    GraficoGradoGuiaService
  ]
})

export class ProfesorModule{
  constructor(){}
}

