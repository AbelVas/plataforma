import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResumenCursoAlumnoService {

  URL='https://app.labrincoteca.edu.gt';

  constructor(private http:HttpClient) { }

  getActividadPorTipoExamen(idCurso:string, idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/calendario/alumno-examen/${idCurso}/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getActividadPorTipoTarea(idCurso:string, idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/calendario/alumno-tarea/${idCurso}/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getActividadPorTipoForo(idCurso:string, idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/calendario/alumno-foro/${idCurso}/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getActividadCalificaciones(idCurso:string, idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/calendario/alumno-calificaciones/${idCurso}/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getActividadCalificacionTotal(idCurso:string, idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/calendario/alumno-calificaciontotal/${idCurso}/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getCalificacionesAlumno(idAlumno:string,data:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/calificacion/actividad/${idAlumno}`,data,httpOptions).pipe(
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
