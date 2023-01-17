import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class TutoresService {
  URL='https://test-server.orquiholic.com';
  constructor(private http:HttpClient) { }

  getTutor():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tutores/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  insertTutor(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/tutores/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteTutor(idTutor:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/tutores/${idTutor}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  editTutor(idTutor:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/tutores/${idTutor}`,data,httpOptions).pipe(
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