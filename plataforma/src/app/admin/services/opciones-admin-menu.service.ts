import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionesAdminMenuService {

  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }
  URL=environment.url


  getOpcionesSideBarAdmin():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/adminOpcionesMenu/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    )
  }

}
