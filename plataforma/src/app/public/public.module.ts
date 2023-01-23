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

  ],
  exports:[
    LoaderComponent,
    LoaderpequeComponent,
    CalendarioComponent,
  ],
  providers:[
    CalendarioService
  ]
})

export class PublicModule{
  constructor(){}
}
