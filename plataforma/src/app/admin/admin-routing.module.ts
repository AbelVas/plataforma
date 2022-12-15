import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AdminComponent } from "./admin.component";
import { ConfigBasicasComponent } from "./configuraciones/config-basicas/config-basicas.component";
import { IndexAdminComponent } from "./dashboard/index-admin.component";
import { CursosComponent } from "./grados/cursos/cursos.component";
import { GradosComponent } from "./grados/grados.component";
import { ProfileComponent } from "./profile/profile.component";


const routes:Routes=[
  {path:'',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component: AdminComponent,children:
  [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' }, component:IndexAdminComponent},
    {path:'settings/basic',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ConfigBasicasComponent},
    {path:'perfil',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:ProfileComponent},
    {path:'grado/:id',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:GradosComponent},
    {path:'grado/curso/:id',canActivate:[AuthGuard,RolesGuard],data: { expectedRole: '1' },component:CursosComponent}
  ]
  },
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
