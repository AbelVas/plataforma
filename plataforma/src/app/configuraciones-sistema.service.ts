import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from './manejo-de-errores.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesSistemaService {
  URL = environment.url;

  constructor(private http: HttpClient,private errorHandler: ManejoDeErroresService) {

  }
  getConfiguracionesPlataforma():Observable<any>{
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/configuracionPlataformaIntegrada/`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
