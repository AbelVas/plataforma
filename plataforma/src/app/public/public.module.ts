import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { PublicRoutingModule } from "./public-routing.module";



import { HomeComponent } from "./home/containers/home.component";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/containers/login.component";
import { LoaderComponent } from './loader/loader.component';
import { LoaderpequeComponent } from './loaderpeque/loaderpeque.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarioService } from "./calendario/calendario.service";
import { LoaderchiquiComponent } from './loaderchiqui/loaderchiqui.component';
import { CodigosService } from "../admin/services/codigos.service";
import { GradosService } from "../admin/services/grados-admin.service";
import { AlumnosService } from "../admin/services/alumnos.service";
import { LoaderConsolComponent } from './loader-consol/loader-consol.component';
import { LoginNuevoComponent } from './login/containers/login-nuevo/login-nuevo.component';
import { WebSocketService } from "../web-socket.service";
import { Socket } from "socket.io-client";
@NgModule({
  imports:[
    PublicRoutingModule,
    SharedModule,
    FullCalendarModule,
  ],
  declarations:[
    PublicComponent,
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    LoaderpequeComponent,
    CalendarioComponent,
    LoaderchiquiComponent,
    LoaderConsolComponent,
    LoginNuevoComponent,
  ],
  exports:[
    LoaderComponent,
    LoaderpequeComponent,
    LoaderchiquiComponent,
    LoaderConsolComponent,
    CalendarioComponent,
  ],
  providers:[
    CalendarioService,
    CodigosService,
    GradosService,
    AlumnosService,
    WebSocketService,
  ]
})

export class PublicModule{
  constructor(){}
}
