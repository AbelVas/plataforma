import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RenasApeApoService {

  URL=environment.url
  private apiUrl = 'http://localhost/backendimagenes/subida-archivos.php';

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  getRenas(idProfesor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/RenasPolicialesPenales/renas/${idProfesor}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getPenales(idProfesor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/RenasPolicialesPenales/apenales/${idProfesor}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  getPoliciacos(idProfesor:string):Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/RenasPolicialesPenales/apoliciacos/${idProfesor}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  insertRenas(idProfesor:string,peso_archivo:any,ruta_archivo:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/RenasPolicialesPenales/renas/${idProfesor}`,{peso_archivo:peso_archivo,ruta_archivo:ruta_archivo},httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  insertPenales(idProfesor:string,peso_archivo:any,ruta_archivo:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/RenasPolicialesPenales/apenales/${idProfesor}`,{peso_archivo:peso_archivo,ruta_archivo:ruta_archivo},httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  insertPoliciacos(idProfesor:string,peso_archivo:any,ruta_archivo:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/RenasPolicialesPenales/apoliciacos/${idProfesor}`,{peso_archivo:peso_archivo,ruta_archivo:ruta_archivo},httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
}
