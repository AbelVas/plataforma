import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesOpcionesCursoService {

  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  calificarActividad(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/calificacion/${idActividad}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getTiposActividad():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tipoActividad/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getTareasCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  crearTarea(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/actividades/`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  deleteTarea(idActividad:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/actividades/${idActividad}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateActividad(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/actividades/${idActividad}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }

  getCursosProfesor(idProfesor:string,idCurso:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/cursos/curso-grado-seccion/${idProfesor}`,idCurso,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  duplicarTarea(idActividad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/actividades/duplicar/${idActividad}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getAlumnoCalificacionActividad(idCurso:string,data:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/calificacion/${idCurso}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  updateUnidad(idUnidad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/unidades/${idUnidad}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  createUnidad(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/unidades/`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  deleteUnidad(idUnidad:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/unidades/${idUnidad}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getUnidades(){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/unidades/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  getUnidadesActivas(){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/unidades/listar/activas/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getAlmunosGrado(idGrado:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/usuarios/alumno-grado/${idGrado}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  getActividadesCurso(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/actividades/${idUsuario}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error)),

    )
  }
// opciones de recursos del curso
  getRecursosCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/recursoweb/recurso-grado/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  crearRecurso(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/recursoweb/`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  deleteRecurso(idtbRecursoVideo:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/recursoweb/${idtbRecursoVideo}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateRecurso(idtbRecursoVideo:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/recursoweb/${idtbRecursoVideo}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  // opciones de Anuncios del curso
  getAnunciosCurso(idCurso:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/anuncios/anuncio-grado/${idCurso}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  crearAnuncio(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/anuncios/`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  deleteAnuncio(idtbAnuncio:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/anuncios/${idtbAnuncio}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateAnuncio(idtbAnuncio:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/anuncios/${idtbAnuncio}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
