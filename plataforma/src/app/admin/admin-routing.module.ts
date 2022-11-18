import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AdminComponent } from "./admin.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component: AdminComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' }, component:IndexAdminComponent},
    {path:'settings/basic',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ConfigBasicasComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ConfigBasicasComponent}
  ]
  },
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
