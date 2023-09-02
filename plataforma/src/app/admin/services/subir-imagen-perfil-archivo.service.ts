import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenPerfilArchivoService {
  URL=environment.url
  constructor(private http:HttpClient) { }

  uploadFile(file:File){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.URL}/cuadroguia/alumnos/`,formData,httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error)
  }
}
