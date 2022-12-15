import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PerfilTutorService {

  URL='http://localhost:3002';

  constructor(private http:HttpClient) {}

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

    getTutor(idUsuario:string):Observable<any>{
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.get(`${this.URL}/tutores/${idUsuario}`,httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    updateTutor(data:any,idTutor:string){
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.put(`${this.URL}/tutores/${idTutor}`,data,httpOptions).pipe(
        catchError(this.handleError)
      );
    }
    passwordCompare(idTutor:string,password:string){
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.post(`${this.URL}/tutores/pass/${idTutor}`,password,httpOptions).pipe(
        catchError(this.handleError)
      )
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
