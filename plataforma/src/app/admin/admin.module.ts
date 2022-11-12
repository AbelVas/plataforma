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
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { CardsBimestreComponent } from './dashboard/components/cards-bimestre/cards-bimestre.component';
import { GraficaContenedorComponent } from './dashboard/components/grafica-contenedor/grafica-contenedor.component';
//


@NgModule({
  imports:[
    AdminRoutingModule,
    SharedModule
  ],
  declarations:[
  AdminComponent,
  IndexAdminComponent,
  ProfileComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  OpcionesPerfilComponent,
  NotificacionesComponent,
  OpcionesMenuComponent,
  ConfiguracionesComponent,
  CardsBimestreComponent,
  GraficaContenedorComponent,
  ],
  exports:[
  ],
  providers:[]
})

export class AdminModule{
  constructor(){}
}
