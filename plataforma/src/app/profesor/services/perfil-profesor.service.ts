import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class PerfilProfesorService {

  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) {}

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

  getProfesor(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/profesores/profesor/${idUsuario}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateProfesor(data:any,idAdmin:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/profesores/profesor/${idAdmin}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  passwordCompare(idAdmin:string,password:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/profesores/profesor/pass/${idAdmin}`,password,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getImagenCategoria(idCategoria:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/fotoPerfilPorDefecto/${idCategoria}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getCategoriasImagenes():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/fotoPerfilPorDefecto/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  actualizarImagenPerfil(idUsuario:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/fotoPerfilPorDefecto/${idUsuario}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
    getFotoPROFE(id:string){
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.get(`${this.URL}/profesores/profesor-foto-perfil/${id}`,httpOptions).pipe(
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
      )
    }
  subidaDeImagen(idAdmin:string,ruta:string,peso:any,rol:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/profesores/profesor-foto-perfil/`,{ruta_imagen:ruta,idProfesor:idAdmin,peso_archivo:peso,subida:"1",idRol:rol},httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  //CURSOS DE PROFESOR
  subidaDeImagenCurso(idCurso:string,ruta:string,peso:any,idProfesor:string){
    console.log({ruta_imagen:ruta,idCurso:idCurso,peso_archivo:peso,subida:"1",idProfesor:idProfesor})
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/profesores/profesor-foto-curso/`,{ruta_imagen:ruta,idCurso:idCurso,peso_archivo:peso,subida:"1",idProfesor:idProfesor},httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getFotoCurso(id:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/profesores/profesor-foto-curso/${id}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
}
