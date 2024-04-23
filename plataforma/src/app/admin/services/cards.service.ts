import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable()
export class CardsService {
  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  getTotalAlumnos():Observable<any>{
    return this.http.get('').pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorHandler.handleHttpError(error)
      )
    );
  }
  getTotalUsuarios():Observable<any>{
    return this.http.get('').pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorHandler.handleHttpError(error)
      )
    );
  }
  getTotalGrados():Observable<any>{
    return this.http.get('').pipe(
      catchError((error: HttpErrorResponse) =>
        this.errorHandler.handleHttpError(error)
      )
    );
  }
}
