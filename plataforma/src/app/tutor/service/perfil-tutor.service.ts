import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilTutorService {

  URL=environment.url

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) {}

  @Output() disparadorCopiarData:EventEmitter<any>=new EventEmitter();

    getTutor(idUsuario:string):Observable<any>{
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.get(`${this.URL}/tutores/${idUsuario}`,httpOptions).pipe(
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
      );
    }
    updateTutor(data:any,idTutor:string){
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.put(`${this.URL}/tutores/${idTutor}`,data,httpOptions).pipe(
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
      );
    }
    passwordCompare(idTutor:string,password:string){
      const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
      return this.http.post(`${this.URL}/tutores/pass/${idTutor}`,password,httpOptions).pipe(
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
      )
    }

}
