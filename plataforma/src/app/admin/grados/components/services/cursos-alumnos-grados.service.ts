import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosAlumnosGradosService {
  URL='http://localhost:3002';
  constructor(private http:HttpClient) { }

  getCursosGrado(idGrado:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/cursos/curso-profesor-grado-admin/${idGrado}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  insertCursosGrado(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/cursos/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteCurso(idCurso:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/cursos/${idCurso}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateCurso(idCurso:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/cursos/${idCurso}`,data,httpOptions).pipe(
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
