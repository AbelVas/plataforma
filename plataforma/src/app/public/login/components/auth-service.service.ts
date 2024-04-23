import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { WebSocketService } from "src/app/web-socket.service";


@Injectable()
export class LoginService {

  constructor(private http:HttpClient, private jwtHelper:JwtHelperService, private socket:WebSocketService) { }
  URL=environment.url


  login(user:any){
    //const httOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    var token=this.http.post(`${this.URL}/auth/login`,user);
    return token
  }
  isAuth():boolean{
    const Token:any=localStorage.getItem('Acces-Token');
    if(!localStorage.getItem('Acces-Token')||this.jwtHelper.isTokenExpired(Token.toString())){
      return false; //SI RETORNA FALSE SIGNIFICA QUE LA SESSIÓN YA NO ESTÁ ACTIVA O EL TOKEN EXPIRÓ
    }
    return true;
  }
  //coso para almacenar el socket en la bd
  enviarDatosSocket(idUsuario:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/socketUsuario/asignar-socket-usuario-docente/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:Response){
    const msg='Codigo de Error: '+error.status+' Status: '+error.statusText;
    return throwError(msg)
  }
}
