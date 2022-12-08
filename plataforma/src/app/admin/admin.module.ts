import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";

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
import { BimestreService } from "./dashboard/containers/admin/dashboard/bimestres.service";
import { GradosJornadasTabsComponent } from './dashboard/components/grados-jornadas-tabs/grados-jornadas-tabs.component';
import { ConfigBasicasComponent } from './configuraciones/config-basicas/config-basicas.component';
import { TablaSeccionesComponent } from './configuraciones/config-basicas/components/tabla-secciones/tabla-secciones.component';
import { TablaJornadasComponent } from './configuraciones/config-basicas/components/tabla-jornadas/tabla-jornadas.component';
import { TablaNivelesComponent } from './configuraciones/config-basicas/components/tabla-niveles/tabla-niveles.component';
import { UnidadesConfigsComponent } from './configuraciones/config-basicas/components/unidades-configs/unidades-configs.component';//
import { JornadasService } from "./configuraciones/config-basicas/services/jornadas.service";
import { NivelesService } from "./configuraciones/config-basicas/services/niveles.service";
import {PerfilService} from "./profile/services/perfil.service"
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { EditPerfilAdminComponent } from './profile/components/edit-perfil-admin/edit-perfil-admin.component';
import { OverviewPerfilAdminComponent } from './profile/components/overview-perfil-admin/overview-perfil-admin.component';
import { PasswordPerfilAdminComponent } from './profile/components/password-perfil-admin/password-perfil-admin.component';
import { PublicModule } from "../public/public.module";
import { CardMatutinaComponent } from './dashboard/components/grados-jornadas-tabs/card-matutina/card-matutina.component';
import { CardVespertinaComponent } from './dashboard/components/grados-jornadas-tabs/card-vespertina/card-vespertina.component';
import { CardFinSemanaComponent } from './dashboard/components/grados-jornadas-tabs/card-fin-semana/card-fin-semana.component';
import { ListarGradosXJornadaService } from "./services/listar-grados-x-jornada.service";



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
    ],
    exports: [],
    providers: [
        BimestreService,
        JornadasService,
        NivelesService,
        PerfilService,
        AuthGuard,
        RolesGuard,
        ListarGradosXJornadaService
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        PublicModule,
    ]
})

export class AdminModule{
  constructor(){}
}
