import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { StudentRoutingModule } from "./student-routing.module";

import {StudentComponent} from "./student.component"
import { DashboardComponent } from './dashboard/dashboard.component';
//


@NgModule({
  imports:[
    StudentRoutingModule,
    SharedModule
  ],
  declarations:[
    StudentComponent,
    DashboardComponent,
  ],
  exports:[
  ],
  providers:[]
})

export class StudentModule{
  constructor(){}
}

