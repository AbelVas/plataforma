import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError} from 'rxjs/operators'
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  URL='http://localhost:3002';

  login(user:any){
    //const httOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}

    return this.http.post(`${this.URL}/auth/login`,user);
  }

  private handleError(error:Response){
    const msg='Codigo de Error: '+error.status+' Status: '+error.statusText;
    return throwError(msg)
  }
}
