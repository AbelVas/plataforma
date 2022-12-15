import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GradosService {
  URL='http://localhost:3002';
  constructor(private http:HttpClient) { }

  getGradoJornada(idJornada:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/grado-jornada/${idJornada}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  insertarGrado(Grado:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/grados/`,Grado,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteGrado(idGrado:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/grados/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateGrado(idGrado:string,grado:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/grados/${idGrado}`,grado,httpOptions).pipe(
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
      }else{
        if(error.status==500){
          msg={
            codigoError:error.statusText,
            Mensaje:"Error en la Petición",
          }
        }
      }
    }
    return throwError(msg)
  }
}
