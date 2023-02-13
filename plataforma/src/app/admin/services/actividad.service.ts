import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  URL=environment.url
  constructor(private http:HttpClient) { }

  calificarActividad(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/calificacion/${idActividad}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTiposActividad():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tipoActividad/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getTareasCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idCurso}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  crearTarea(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/actividades/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteTarea(idActividad:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/actividades/${idActividad}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateActividad(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/actividades/${idActividad}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getCursosProfesor(idProfesor:string,idCurso:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/cursos/curso-grado-seccion/${idProfesor}`,idCurso,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  duplicarTarea(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/actividades/duplicar/${idActividad}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getAlumnoCalificacionActividad(idCurso:string,data:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/calificacion/${idCurso}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // opciones de recursos del curso
  getRecursosCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/recursoweb/recurso-grado/${idCurso}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  crearRecurso(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/recursoweb/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteRecurso(idtbRecursoVideo:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/recursoweb/${idtbRecursoVideo}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateRecurso(idtbRecursoVideo:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/recursoweb/${idtbRecursoVideo}`,data,httpOptions).pipe(
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
