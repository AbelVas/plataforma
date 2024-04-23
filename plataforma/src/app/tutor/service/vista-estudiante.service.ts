import { Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';


@Injectable({
  providedIn: 'root'
})
export class VistaEstudianteService {

  URL=environment.url

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  getAlumno(idAlumno:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/usuarios/${idAlumno}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getAlumnoporTutor(idTutor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tutores/alumnos/${idTutor}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getCursoporAlumno(idAlumno:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/curso-alumno/${idAlumno}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }

  getCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
