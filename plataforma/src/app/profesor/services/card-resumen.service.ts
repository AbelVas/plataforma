import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardResumenService {

  URL=environment.url
  constructor(private http:HttpClient) { }

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  getCursoporProfesor(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/curso-profesor/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getGradoPorProfesor(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/grado-profesor/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/${idCurso}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateCurso(idCurso:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/cursos/${idCurso}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAlumnosGrado(idGradoAl:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/usuarios/alumno-grado/${idGradoAl}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getTareasCurso(idCursoAl:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idCursoAl}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  Prueba():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Alumnos-Total/grados/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

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

  obtenerPromedioFinalNotas(idGrado:string,idCurso:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/boletas/boleta-final-promedio-curso/${idCurso}/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  //  IMAGENES POR DEFECTO
  getImagenCategoria(idCategoria:2):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/fotoPerfilPorDefecto/${idCategoria}`,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error:HttpErrorResponse){

    return throwError(error)
  }
}
