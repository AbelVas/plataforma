import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";

//Para que funcionen las tablas pd. Hay que importarlos en la parte de abajo
import { MatTableModule } from "@angular/material/table";
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
//Cosito notificaciones
//Fin cosos tabla

import { AdminComponent } from "./admin.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from "./margenes/header/navbar.component";
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { FooterComponent } from "./margenes/footer/footer.component";
import { OpcionesPerfilComponent } from './margenes/header/components/opciones-perfil/opciones-perfil.component';
import { NotificacionesComponent } from './margenes/header/components/notificaciones/notificaciones.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { CardsBimestreComponent } from './dashboard/components/cards-resumen/cards-bimestre.component';
import { GraficaContenedorComponent } from './dashboard/components/grafica-contenedor/grafica-contenedor.component';
import { AjustesUnidadComponent } from './dashboard/components/ajustes-unidad/ajustes-unidad.component';
import { BimestreService } from "./services/bimestres.service";
import { GradosJornadasTabsComponent } from './dashboard/components/grados-jornadas-tabs/grados-jornadas-tabs.component';
import { ConfigBasicasComponent } from './configuraciones/config-basicas/config-basicas.component';
import { TablaSeccionesComponent } from './configuraciones/config-basicas/components/tabla-secciones/tabla-secciones.component';
import { TablaJornadasComponent } from './configuraciones/config-basicas/components/tabla-jornadas/tabla-jornadas.component';
import { TablaNivelesComponent } from './configuraciones/config-basicas/components/tabla-niveles/tabla-niveles.component';
import { UnidadesConfigsComponent } from './configuraciones/config-basicas/components/unidades-configs/unidades-configs.component';//
import { JornadasService } from "./services/jornadas.service";
import { NivelesService } from "./services/niveles.service";
import {PerfilService} from "./services/perfil.service"
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { EditPerfilAdminComponent } from './profile/components/edit-perfil-admin/edit-perfil-admin.component';
import { OverviewPerfilAdminComponent } from './profile/components/overview-perfil-admin/overview-perfil-admin.component';
import { PasswordPerfilAdminComponent } from './profile/components/password-perfil-admin/password-perfil-admin.component';
import { PublicModule } from "../public/public.module";
import { CardMatutinaComponent } from './dashboard/components/grados-jornadas-tabs/card-matutina/card-matutina.component';
import { CardVespertinaComponent } from './dashboard/components/grados-jornadas-tabs/card-vespertina/card-vespertina.component';
import { CardFinSemanaComponent } from './dashboard/components/grados-jornadas-tabs/card-fin-semana/card-fin-semana.component';
import { GradosService } from "./services/grados-admin.service";
import { SeccionesService } from "./services/secciones.service";
import { DocentesResumenComponent } from './dashboard/components/docentes-resumen/docentes-resumen.component';
import { GradosComponent } from './grados/grados.component';
import { CardAlumnosComponent } from './grados/components/card-alumnos/card-alumnos.component';
import { CardCursosComponent } from './grados/components/card-cursos/card-cursos.component';
import { CursosAlumnosGradosService } from "./services/cursos-alumnos-grados.service";
import { CursosComponent } from './grados/cursos/cursos.component';
import { GradosAlumnosService } from "./services/grados-alumnos.service";
import { ProfesoresService } from "./services/profesores.service";
import { ListaActividadesComponent } from './grados/cursos/components/lista-actividades/lista-actividades.component';
import { ActividadService } from "./services/actividad.service";
import { UnidadesService } from "./services/unidades.service";
import { CodigosService } from "./services/codigos.service";
import { CodigosComponent } from './codigos/codigos.component';
import { ListaGradosComponent } from './lista-grados/lista-grados.component';
import { ComplementosComponent } from './complementos/complementos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlumnosComponent } from './usuarios/alumnos/alumnos.component';
import { TutoresComponent } from './usuarios/tutores/tutores.component';
import { CuadroGuiaService } from "./services/cuadro-guia.service";
import { TutoresService } from "./usuarios/tutores/tutores.service";
import { AlumnosService } from "./services/alumnos.service";
import { EstadisticasDashboardService } from "./services/estadisticas-dashboard.service";
import { ImagenesPerfilDefectoService } from "./services/imagenes-perfil-defecto.service";
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { NgChartsModule } from "ng2-charts";
import { ListaRecursosComponent } from './grados/cursos/components/lista-recursos/lista-recursos.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { PagosComponent } from './pagos/pagos.component';
import { ConsolidadoBimestralComponent } from "./consolidado-bimestral/consolidado-bimestral.component";
import { CuadroGuiaComponent } from './cuadro-guia/cuadro-guia.component';


@NgModule({
    declarations: [
        AdminComponent,
        IndexAdminComponent,
        ProfileComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        OpcionesPerfilComponent,
        NotificacionesComponent,
        OpcionesMenuComponent,
        CardsBimestreComponent,
        GraficaContenedorComponent,
        AjustesUnidadComponent,
        GradosJornadasTabsComponent,
        ConfigBasicasComponent,
        TablaSeccionesComponent,
        TablaJornadasComponent,
        TablaNivelesComponent,
        UnidadesConfigsComponent,
        EditPerfilAdminComponent,
        OverviewPerfilAdminComponent,
        PasswordPerfilAdminComponent,
        CardMatutinaComponent,
        CardVespertinaComponent,
        CardFinSemanaComponent,
        DocentesResumenComponent,
        GradosComponent,
        CardAlumnosComponent,
        CardCursosComponent,
        CursosComponent,
        ListaActividadesComponent,
        CodigosComponent,
        ListaGradosComponent,
        ComplementosComponent,
        UsuariosComponent,
        AlumnosComponent,
        TutoresComponent,
        EstadisticaComponent,
        ListaRecursosComponent,
        TutorialComponent,
        PagosComponent,
        ConsolidadoBimestralComponent,
        CuadroGuiaComponent
    ],
    exports: [],
    providers: [
        BimestreService,
        JornadasService,
        NivelesService,
        PerfilService,
        AuthGuard,
        RolesGuard,
        GradosService,
        SeccionesService,
        CursosAlumnosGradosService,
        GradosAlumnosService,
        ProfesoresService,
        ActividadService,
        UnidadesService,
        CodigosService,
        CuadroGuiaService,
        TutoresService,
        AlumnosService,
        EstadisticasDashboardService,
        ImagenesPerfilDefectoService,
        AlumnosService
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        PublicModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
        NgChartsModule
    ]
})

export class AdminModule{
  constructor(){}
}
