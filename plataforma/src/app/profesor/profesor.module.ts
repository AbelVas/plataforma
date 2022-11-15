import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { ProfesorRoutingModule } from "./profesor-routing.module";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './margenes/footer/footer.component';
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { HeaderComponent } from './margenes/header/header.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { ConfigBasicasComponent } from './configuraciones/config-basicas/config-basicas.component';
import { OpcionesPerfilComponent } from "./margenes/header/components/opciones-perfil/opciones-perfil.component";
import { NotificacionesComponent } from "./margenes/header/components/notificaciones/notificaciones.component";
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
  ConfigBasicasComponent,
  OpcionesPerfilComponent,
  NotificacionesComponent
  ],
  exports:[
  ],
  providers:[]
})

export class ProfesorModule{
  constructor(){}
}

