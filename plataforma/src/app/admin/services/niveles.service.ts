import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError,} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable()
export class NivelesService {
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }
  URL=environment.url
  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  getNiveles():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateNiveles(idNivel:string,data:any,usuarioModifico:string,usuario:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/niveles/${idNivel}/${usuarioModifico}/${usuario}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getNivelesJornadaMatutina():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/nivel-jornada/1`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getNivelesJornadaVespertina():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/nivel-jornada/2`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  crearNivel(data:any,usuarioModifico:string,usuario:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/niveles/${usuarioModifico}/${usuario}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  deleteNivel(idNivel:string,usuarioModifico:string,usuario:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/niveles/${idNivel}/${usuarioModifico}/${usuario}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  private handleError(error:HttpErrorResponse){
    var msg={};
    if(error.status==400){
       msg=
        {
          codigoError:error.statusText,
          Mensaje:"Acceso Denegado, Vuelva a iniciar sesión",
          icono:'<i class="fa-solid fa-shield-xmark"></i>'
        }
    }else{
      if(error.status==0){
        msg={
          codigoError:error.statusText,
          Mensaje:"Error de conexión con el servidor",
          icono:'<i class="fa-solid fa-shield-xmark"></i>'
        }
      }
    }
    return throwError(msg)
  }
}
