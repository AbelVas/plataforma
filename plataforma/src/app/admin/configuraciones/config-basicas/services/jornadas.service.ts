import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError, mergeScan} from 'rxjs/operators'

@Injectable()
export class JornadasService {

  constructor(private http:HttpClient) { }
  URL='https://app.labrincoteca.edu.gt';

  getJornadas():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/jornadas/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateJornada(idJornada:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/jornadas/${idJornada}`,data,httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  insertJornada(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/jornadas/`,data,httpOptions).pipe(
      catchError(this.handleError)
      );
  }
  deleteJornada(idJornada:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/jornadas/${idJornada}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){
    var errorDetalle:any={
      codigo:error.status,
      msg:error.statusText
    };

    return throwError(errorDetalle)
  }
}
