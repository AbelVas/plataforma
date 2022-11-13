import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map,tap,catchError} from 'rxjs/operators'

@Injectable()
export class CardsService {

  constructor(private http:HttpClient) { }

  getTotalAlumnos():Observable<any>{
    return this.http.get('');
  }
  getTotalUsuarios():Observable<any>{
    return this.http.get('');
  }
  getTotalGrados():Observable<any>{
    return this.http.get('');
  }

  private handleError(error:Response){
    console.log(error);
    const msg='Codigo de Error: '+error.status+' Status: '+error.statusText;
    return throwError(msg)
  }
}
