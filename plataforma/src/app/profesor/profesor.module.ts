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
import { CardResumenCursosProfesorComponent } from './cursos-profesor/card-resumen-cursos-profesor/card-resumen-cursos-profesor.component';
import { CursoCalendarioProfesoresComponent } from './cursos-profesor/curso-calendario-profesores/curso-calendario-profesores.component';
import { LisAlumnosProfesoresComponent } from './cursos-profesor/lis-alumnos-profesores/lis-alumnos-profesores.component';
import { ActAnuRecCursosProfesoresComponent } from './cursos-profesor/act-anu-rec-cursos-profesores/act-anu-rec-cursos-profesores.component';
import { ActividadesCursosProfesorComponent } from './cursos-profesor/act-anu-rec-cursos-profesores/actividades-cursos-profesor/actividades-cursos-profesor.component';
import { AnunciosCursosProfesoresComponent } from './cursos-profesor/act-anu-rec-cursos-profesores/anuncios-cursos-profesores/anuncios-cursos-profesores.component';
import { RecursosCursosProfesorComponent } from './cursos-profesor/act-anu-rec-cursos-profesores/recursos-cursos-profesor/recursos-cursos-profesor.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { OverviewPerfilProfesorComponent } from './perfil-profesor/components/overview-perfil-profesor/overview-perfil-profesor.component';
import { EditPerfilProfesorComponent } from './perfil-profesor/components/edit-perfil-profesor/edit-perfil-profesor.component';
import { SettingsPefilProfesorComponent } from './perfil-profesor/components/settings-pefil-profesor/settings-pefil-profesor.component';
import { PasswordPerfilProfesoresComponent } from './perfil-profesor/components/password-perfil-profesores/password-perfil-profesores.component';
import { PerfilProfesorService } from "./perfil-profesor/services/perfil-profesor.service";
import { TablaProfesoresComponent } from "./configuraciones/config-basicas/components/prueba-tabla-profesores/prueba-tabla-profesores.component";
import { ProfesoresService } from "./configuraciones/config-basicas/services/profesores.service";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
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
  CardResumenCursosProfesorComponent,
  CursoCalendarioProfesoresComponent,
  LisAlumnosProfesoresComponent,
  ActAnuRecCursosProfesoresComponent,
  ActividadesCursosProfesorComponent,
  AnunciosCursosProfesoresComponent,
  RecursosCursosProfesorComponent,
  PerfilProfesorComponent,
  OverviewPerfilProfesorComponent,
  EditPerfilProfesorComponent,
  SettingsPefilProfesorComponent,
  PasswordPerfilProfesoresComponent
  ],
  exports:[
  ],
  providers:[
    PerfilProfesorService
    ProfesoresService,
    AuthGuard,
    RolesGuard
  ]
})

export class ProfesorModule{
  constructor(){}
}

