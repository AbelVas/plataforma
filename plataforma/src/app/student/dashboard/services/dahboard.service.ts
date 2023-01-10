import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DahboardService {

  URL='http://localhost:3002';

  constructor(private http:HttpClient) { }

  // Este get es para los cards de alumnos
  getCursoparaAlumno(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/curso-alumno/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // /:id para el curso especifico
  getCursoEspecifico(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  //traer las actividades de un curso
  getActividadesCurso(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
//traer actividades de todos los cursos por alumno
getActividadesparaEventos(idUsuario:string):Observable<any>{
  const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
  return this.http.get(`${this.URL}/calendario/alumno/${idUsuario}`,httpOptions).pipe(
    catchError(this.handleError)
  )
}
  //para traer la info del maestro
  getProfeCurso(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/profe-curso/${idUsuario}`,httpOptions).pipe(
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
