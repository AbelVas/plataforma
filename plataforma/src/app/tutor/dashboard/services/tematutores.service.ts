import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TematutoresService {

  URL='http://localhost:3002';

  constructor(private http:HttpClient) {}

    getTemaActivo(activo:string):Observable<any>{
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.get(`${this.URL}/temas/activo/${activo}`,httpOptions).pipe(
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
