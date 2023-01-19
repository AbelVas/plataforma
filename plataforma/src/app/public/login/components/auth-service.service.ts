import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError} from 'rxjs/operators'
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient, private jwtHelper:JwtHelperService) { }
  URL=environment.url


  login(user:any){
    //const httOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/auth/login`,user);
  }
  isAuth():boolean{
    const Token:any=localStorage.getItem('Acces-Token');
    if(!localStorage.getItem('Acces-Token')||this.jwtHelper.isTokenExpired(Token.toString())){
      return false; //SI RETORNA FALSE SIGNIFICA QUE LA SESSIÓN YA NO ESTÁ ACTIVA O EL TOKEN EXPIRÓ
    }
    return true;
  }

  private handleError(error:Response){
    const msg='Codigo de Error: '+error.status+' Status: '+error.statusText;
    return throwError(msg)
  }
}
