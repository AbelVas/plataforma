import { Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesCursoAlumnoTutorService {

  URL=environment.url

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  getActividadesCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getCalificacionesAlumno(idAlumno:string,data:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/calificacion/actividad/${idAlumno}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getAlumnoCalificacionActividad(idCurso:string,data:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/calificacion/${idCurso}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getRecursosCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/recursoweb/recurso-grado/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getAnunciosCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/anuncios/anuncio-grado/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
