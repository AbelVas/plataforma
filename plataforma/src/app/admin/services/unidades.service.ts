import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UnidadesService {
  URL=environment.url
  constructor(private http:HttpClient) { }

  updateUnidad(idUnidad:string,data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.put(`${this.URL}/unidades/${idUnidad}`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  createUnidad(data:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/unidades/`,data,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteUnidad(idUnidad:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.delete(`${this.URL}/unidades/${idUnidad}`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getUnidades(){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/unidades/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getUnidadesActivas(){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/unidades/listar/activas/`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deshabilitarVerNotas(estado:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/usuarios/ver_notas/0`,httpOptions).pipe(
      catchError(this.handleError));
  }
  habilitarVerNotas(estado:any){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/usuarios/ver_notas/1`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getNotasVer(){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/usuarios/obtener-notas/1`,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){

    return throwError(error)
  }
}
