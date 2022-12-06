import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { TutorComponent } from "./tutor.component";

const routes:Routes=[
  {path:'',component: TutorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorRoutingModule{}
