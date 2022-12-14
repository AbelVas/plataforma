import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";


import { AdminComponent } from "./admin.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";


const routes:Routes=[
  {path:'',component: AdminComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:IndexAdminComponent},
  ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
