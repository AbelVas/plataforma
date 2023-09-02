import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpcionesMenuService {

  URL=environment.url
  constructor(private http:HttpClient) { }

     getOpcionesMenu():Observable<any>{
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.get(`${this.URL}/plugin/menu-alumno/`,httpOptions).pipe(
        catchError(this.handleError)
      );
    }
  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }
}
