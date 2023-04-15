import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuadroGuiaService {
  URL=environment.url
  constructor(private http:HttpClient) { }

//consolidado bimestral ADMINISTRADORES/PROFESORES
  getAlumnosGradoCuadroGuia(idGrado:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cuadroguia/alumnos/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
 getActividadesCurso(idCurso:string,idUnidad:string){
  const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
  return this.http.get(`${this.URL}/cuadroguia/actividades-curso/${idCurso}/${idUnidad}`,httpOptions).pipe(
    catchError(this.handleError)
  );
 }
 getNotasFinal(idCurso:string,idUnidad:string,idGrado:string,){
  const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
  return this.http.get(`${this.URL}/cuadroguia/${idCurso}/${idUnidad}/${idGrado}`,httpOptions).pipe(
    catchError(this.handleError)
  );
 }
  cursoDocente(idCruso:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/curso-profesor-individual/${idCruso}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
//CUADRO GUIA
  obtenerGradoSeccion(idGrado:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/grado-seccion-nivel-jornada/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  obtenerCursosGrado(idGrado:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cuadroguia/cursos-cuadro-guia/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  obtenerNotasCuadroGuia(idGrado:string,idUnidad:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cuadroguia/${idGrado}/${idUnidad}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){

    return throwError(error)
  }
}
