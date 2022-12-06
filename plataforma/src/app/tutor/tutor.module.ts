import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { TutorRoutingModule } from "./tutor-routing.module";

import { TutorComponent } from "./tutor.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './margenes/footer/footer.component';
import { HeaderComponent } from './margenes/header/header.component';
import { NotificacionesComponent } from './margenes/header/components/notificaciones/notificaciones.component';
import { OpcionesPerfilComponent } from './margenes/header/components/opciones-perfil/opciones-perfil.component';
import { SidebarComponent } from './margenes/sidebar/sidebar.component';
import { OpcionesMenuComponent } from './margenes/sidebar/opciones-menu/opciones-menu.component';
import { CardResumenComponent } from './dashboard/components/card-resumen/card-resumen.component';
import { AllCalendarioTutorComponent } from './dashboard/components/all-calendario-tutor/all-calendario-tutor.component';
import { CardClasesComponent } from './dashboard/components/card-clases/card-clases.component';
import { ActividadesPendientesComponent } from './dashboard/components/actividades-pendientes/actividades-pendientes.component';
import { CompanerosEstudiantesComponent } from './dashboard/components/companeros-estudiantes/companeros-estudiantes.component';
import { HorarioTutorComponent } from './dashboard/components/horario-tutor/horario-tutor.component';

@NgModule({
  imports:[
    TutorRoutingModule,
    SharedModule
  ],
  declarations:[
    TutorComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    NotificacionesComponent,
    OpcionesPerfilComponent,
    SidebarComponent,
    OpcionesMenuComponent,
    CardResumenComponent,
    AllCalendarioTutorComponent,
    CardClasesComponent,
    ActividadesPendientesComponent,
    CompanerosEstudiantesComponent,
    HorarioTutorComponent
  ],
  exports:[
  ],
  providers:[
  ]
})

export class TutorModule{
  constructor(){}
}
