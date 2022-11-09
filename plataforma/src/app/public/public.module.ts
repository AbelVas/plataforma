import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/components/shared.module";
import { PublicRoutingModule } from "./public-routing.module";

import { HomeComponent } from "./home/containers/home.component";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/containers/login.component";

@NgModule({
  imports:[
    PublicRoutingModule,
    SharedModule
  ],
  declarations:[
    PublicComponent,
    HomeComponent,
    LoginComponent,
  ],
  exports:[
  ],
  providers:[]
})

export class PublicModule{
  constructor(){}
}
