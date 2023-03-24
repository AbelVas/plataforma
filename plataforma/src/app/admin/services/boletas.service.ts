import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletasService {

  URL=environment.url
  constructor(private http:HttpClient) { }

  getAlumnoGrado(idGrado:string,idAlumno:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/boletas/${idGrado}/${idAlumno}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCuerpoBoleta(idGrado:string,idAlumno:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/boletas/boleta-final/${idGrado}/${idAlumno}`,httpOptions).pipe(
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
