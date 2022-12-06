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
  ],
  exports:[
  ],
  providers:[]
})

export class StudentModule{
  constructor(){}
}

