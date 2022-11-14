import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";


import { AdminComponent } from "./admin.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";


const routes:Routes=[
  {path:'',component: AdminComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:IndexAdminComponent},
    {path:'settings/basic',component:ConfigBasicasComponent}
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
