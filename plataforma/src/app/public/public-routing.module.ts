import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";
import { LoginComponent } from "./login/containers/login.component";
import { LoginNuevoComponent } from "./login/containers/login-nuevo/login-nuevo.component";


const routes:Routes=[
  {path:'',component: PublicComponent,children:
  [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'login/prueba',component:LoginNuevoComponent}
  ]
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule{}
