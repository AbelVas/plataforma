import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class GradoGuiaProfesorService {

  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  getGradoGuiaProfesor(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/profesores/gradoguia/${idUsuario}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getAlumnosGrado(idGradoAl:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/usuarios/alumno-grado/${idGradoAl}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }

  getGrado(idGrado:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/${idGrado}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
}
