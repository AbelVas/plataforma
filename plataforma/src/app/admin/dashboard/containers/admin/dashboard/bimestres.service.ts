import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError} from 'rxjs/operators'

@Injectable()
export class BimestreService {

  constructor(private http:HttpClient) { }
  URL='http://localhost:3002';

  getUnidades():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/unidades/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateUnidadesEstado(idUnidad:any,estado:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/unidades/${idUnidad}`,estado,httpOptions);
  }
  private handleError(error:Response){
    const msg='Codigo de Error: '+error.status+' Status: '+error.statusText;
    return throwError(msg)
  }
}
