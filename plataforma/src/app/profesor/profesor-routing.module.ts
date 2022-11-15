import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


const routes:Routes=[
  {path:'',component: ProfesorComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'settings/apariencia',component:ConfigBasicasComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfesorRoutingModule{}
