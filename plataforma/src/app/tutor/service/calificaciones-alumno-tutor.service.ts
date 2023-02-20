import { Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesAlumnoTutorService {

  URL=environment.url
  constructor(private http:HttpClient) { }

  getTutor(idUsuario:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tutores/${idUsuario}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAlumnoporTutor(idTutor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/tutores/alumnos/${idTutor}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  //Nueva tabla relacion alumno  tutor
  getAlumnosdelTutor(idTutor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/relaciontutoralumno/tutoralumnos/${idTutor}`,httpOptions).pipe(
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
      }
    }
    return throwError(msg)
  }
}
