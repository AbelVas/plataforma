import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaEspecialService {

  URL=environment.url
  constructor(private http:HttpClient) { }

  getAlumnoGrado(idGrado:string,idAlumno:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/boletas/${idGrado}/${idAlumno}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCuerpoBoletaEspecial(idGrado:string,idAlumno:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/boletas/boleta-final-especial/${idGrado}/${idAlumno}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }
}