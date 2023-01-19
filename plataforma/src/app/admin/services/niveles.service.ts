import { EventEmitter, Injectable, Output } from '@angular/core';

import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable()
export class NivelesService {
  constructor(private http:HttpClient) { }
  URL=environment.url
  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  getNiveles():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateNiveles(idNivel:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/niveles/${idNivel}`,data,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  getNivelesJornadaMatutina():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/nivel-jornada/1`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getNivelesJornadaVespertina():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/niveles/nivel-jornada/2`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  crearNivel(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/niveles/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteNivel(idNivel:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/niveles/${idNivel}`,httpOptions).pipe(
      catchError(this.handleError)
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
