import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable()
export class JornadasService {

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }
  URL=environment.url

  getJornadas():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/jornadas/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
  updateJornada(idJornada:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/jornadas/${idJornada}`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }
  insertJornada(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/jornadas/`,data,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
      );
  }
  deleteJornada(idJornada:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/jornadas/${idJornada}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
