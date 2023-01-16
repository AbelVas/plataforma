import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoreModule } from './core/shared/core.module';
import {JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,//**1 */
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    {provide: JWT_OPTIONS, useValue:JWT_OPTIONS},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
