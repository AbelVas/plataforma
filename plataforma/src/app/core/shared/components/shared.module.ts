import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from "./not-found/not-cound.component";
import { FormsModule } from "@angular/forms";
import { LoginService } from "src/app/public/login/components/auth-service.service";

@NgModule({
  imports:[
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations:[
    NotFoundComponent
  ],
  exports:[
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NotFoundComponent
  ],
  providers:[
    LoginService
  ]
})

export class SharedModule{
  constructor(){}
}
