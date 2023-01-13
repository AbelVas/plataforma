import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class EstadisticasDashboardService {
  URL='http://localhost:3002';
  constructor(private http:HttpClient) { }

  getTotalAlumnos():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Alumnos-Total/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTotalAlumnosHombres():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Alumnos-Hombres/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTotalAlumnosMujeres():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Alumnos-Mujeres/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTotalCodigosUso():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Codigos-uso/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTotalCodigosNoUso():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Codigos-desuso/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDocenteContrasenaCambiada():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Profesor-Contrasena/Cambiada/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDocenteContrasenaNoCambiada():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Profesor-Contrasena/No-Cambiada/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCantidadGrados():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/CantidadGrados`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCantidadDocentes():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/estadistica/Cantidad-docentes`,httpOptions).pipe(
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
