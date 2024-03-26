import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradosService {
  URL=environment.url
  constructor(private http:HttpClient) { }

  getGradoNivel(idNivel:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/grado-nivel/${idNivel}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getGradoJornada(idJornada:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/grado-jornada/${idJornada}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  insertarGrado(Grado:any):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/grados/`,Grado,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteGrado(idGrado:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/grados/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateGrado(idGrado:string,grado:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/grados/${idGrado}`,grado,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getGrados():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/grados/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  //grados guias asignados y no asignados
  gerGradoGuiaAsignado():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/gradoguiaasignacion/existentes`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  gerGradoGuiaSinAsignar():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/gradoguiaasignacion/faltantes`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteGradoGuiaDocenteRelacion(idGradoGuia:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/gradoguiaasignacion/eliminar/${idGradoGuia}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  crearGradoGuiaDocenteRelacion(GradoDocenteGuia:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/gradoguiaasignacion/crear/`,GradoDocenteGuia,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updaateGradoGuiaDocenteRelacion(GradoDocenteGuia:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/gradoguiaasignacion/editar/`,GradoDocenteGuia,httpOptions).pipe(
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
