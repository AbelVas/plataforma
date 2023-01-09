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
import { GradoGuiaProfesorComponent } from './grado-guia-profesor/grado-guia-profesor.component';
import { CursosProfesorComponent } from './cursos-profesor/cursos-profesor.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { OverviewPerfilProfesorComponent } from './perfil-profesor/components/overview-perfil-profesor/overview-perfil-profesor.component';
import { EditPerfilProfesorComponent } from './perfil-profesor/components/edit-perfil-profesor/edit-perfil-profesor.component';
import { PasswordPerfilProfesoresComponent } from './perfil-profesor/components/password-perfil-profesores/password-perfil-profesores.component';
import { PerfilProfesorService } from "./perfil-profesor/services/perfil-profesor.service";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { CardClasesJornadasService } from "./dashboard/services/card-clases-jornadas.service";
import { CardResumenService } from "./dashboard/services/card-resumen.service";
import { HorarioProfesorComponent } from './dashboard/components/horario-profesor/horario-profesor.component';
import { HorarioProfesorService } from "./dashboard/services/horario-profesor.service";
import { DashboardService } from "./dashboard/services/dashboard.service";
import { GradoGuiaProfesorService } from "./grado-guia-profesor/services/grado-guia-profesor.service";
import { CursosCardResumenComponent } from './cursos-profesor/components/cursos-card-resumen/cursos-card-resumen.component';
import { OpcionesCursoComponent } from './cursos-profesor/components/opciones-curso/opciones-curso.component';
import { CalendarioCursoComponent } from './cursos-profesor/components/calendario-curso/calendario-curso.component';
import { AlumnosCursoComponent } from './cursos-profesor/components/alumnos-curso/alumnos-curso.component';
import { AlumnosCursoService } from "./cursos-profesor/services/alumnos-curso.service";
import { CalendarioCursoService } from "./cursos-profesor/services/calendario-curso.service";
import { AnunciosOpcionesCursoComponent } from './cursos-profesor/components/opciones-curso/components/anuncios-opciones-curso/anuncios-opciones-curso.component';
import { ActividadesOpcionesCursoComponent } from './cursos-profesor/components/opciones-curso/components/actividades-opciones-curso/actividades-opciones-curso.component';
import { RecursosOpcionesCursoComponent } from './cursos-profesor/components/opciones-curso/components/recursos-opciones-curso/recursos-opciones-curso.component';
import { ActividadesOpcionesCursoService } from "./cursos-profesor/components/opciones-curso/services/actividades-opciones-curso.service";
import { AnunciosOpcionesCursoService } from "./cursos-profesor/components/opciones-curso/services/anuncios-opciones-curso.service";
import { RecursosOpcionesCursoService } from "./cursos-profesor/components/opciones-curso/services/recursos-opciones-curso.service";
import { CalendarioProfesorComponent } from './calendario-profesor/calendario-profesor.component';
import { CalendarioProfesorService } from "./calendario-profesor/services/calendario-profesor.service";
import { ForoCursoProfesorComponent } from './foro-curso-profesor/foro-curso-profesor.component';
import { ForoCursoProfesorService } from "./foro-curso-profesor/services/foro-curso-profesor.service";
import { ExamenCursoProfesorComponent } from './examen-curso-profesor/examen-curso-profesor.component';
import { ExamenCursoProfesorService } from "./examen-curso-profesor/services/examen-curso-profesor.service";
import { ActividadCursoProfesorComponent } from './actividad-curso-profesor/actividad-curso-profesor.component';
import { ActividadCursoComponent } from './actividad-curso-profesor/components/actividad-curso/actividad-curso.component';
import { CalificacionesActividadComponent } from './actividad-curso-profesor/components/calificaciones-actividad/calificaciones-actividad.component';
import { AlumnosActividadComponent } from './actividad-curso-profesor/components/alumnos-actividad/alumnos-actividad.component';
import { GraficoActividadComponent } from './actividad-curso-profesor/components/grafico-actividad/grafico-actividad.component';
import { ActividadCursoProfesorService } from "./actividad-curso-profesor/services/actividad-curso-profesor.service";
import { ColumnaDerechaProfesorComponent } from './dashboard/components/columna-derecha-profesor/columna-derecha-profesor.component';
import { ExamenCursoComponent } from './examen-curso-profesor/components/examen-curso/examen-curso.component';
import { CalificacionesExamenComponent } from './examen-curso-profesor/components/calificaciones-examen/calificaciones-examen.component';
import { AlumnosExamenComponent } from './examen-curso-profesor/components/alumnos-examen/alumnos-examen.component';
import { GraficoExamenComponent } from './examen-curso-profesor/components/grafico-examen/grafico-examen.component';
import { CursosComponent } from "./cursos/cursos.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendariogeneralComponent } from './calendariogeneral/calendariogeneral.component';
import { FullCalendarComponent, FullCalendarModule } from "@fullcalendar/angular";
import { PublicModule } from "../public/public.module";
//


@NgModule({
  imports:[
    ProfesorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FullCalendarModule,
    PublicModule
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
  GradoGuiaProfesorComponent,
  CursosProfesorComponent,
  PerfilProfesorComponent,
  OverviewPerfilProfesorComponent,
  EditPerfilProfesorComponent,
  PasswordPerfilProfesoresComponent,
  HorarioProfesorComponent,
  CursosCardResumenComponent,
  OpcionesCursoComponent,
  CalendarioCursoComponent,
  AlumnosCursoComponent,
  AnunciosOpcionesCursoComponent,
  ActividadesOpcionesCursoComponent,
  RecursosOpcionesCursoComponent,
  CalendarioProfesorComponent,
  ForoCursoProfesorComponent,
  ExamenCursoProfesorComponent,
  ActividadCursoProfesorComponent,
  ActividadCursoComponent,
  CalificacionesActividadComponent,
  AlumnosActividadComponent,
  GraficoActividadComponent,
  ColumnaDerechaProfesorComponent,
  ExamenCursoComponent,
  CalificacionesExamenComponent,
  AlumnosExamenComponent,
  GraficoExamenComponent,
  CursosComponent,
  CalendariogeneralComponent
  ],
  exports:[
  ],
  providers:[
    PerfilProfesorService,
    DashboardService,
    AuthGuard,
    RolesGuard,
    CardClasesJornadasService,
    CardResumenService,
    HorarioProfesorService,
    GradoGuiaProfesorService,
    AlumnosCursoService,
    CalendarioCursoService,
    CursosCardResumenComponent,
    OpcionesCursoComponent,
    ActividadesOpcionesCursoService,
    AnunciosOpcionesCursoService,
    RecursosOpcionesCursoService,
    CalendarioProfesorService,
    ForoCursoProfesorService,
    ExamenCursoProfesorService,
    ActividadCursoProfesorService
  ]
})

export class ProfesorModule{
  constructor(){}
}

