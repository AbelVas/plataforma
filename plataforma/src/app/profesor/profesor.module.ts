import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { ProfesorRoutingModule } from "./profesor-routing.module";

import { ProfesorComponent } from "./profesor.component";
import { DashboardComponent } from './dashboard/dashboard.component';
//


@NgModule({
  imports:[
    ProfesorRoutingModule,
    SharedModule
  ],
  declarations:[
  ProfesorComponent,
  DashboardComponent,
  ],
  exports:[
  ],
  providers:[]
})

export class ProfesorModule{
  constructor(){}
}

