import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';


@Injectable({
  providedIn: 'root'
})
export class UploadFotoPerfilService {

      private apiUrl = 'http://localhost/backendimagenes/foto-perfil.php';
      private apiUrlCurso = 'http://localhost/backendimagenes/foto-curso.php';  //<- pruebas en local
    //private apiUrl = 'serverimages/foto-perfil.php'; //<-en producción

  constructor(private http: HttpClient,private errorHandler: ManejoDeErroresService) { }

  /*uploadFile(file: File, userId: number, userRole: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
    formData.append('userRole', userRole);

    return this.http.post<any>(this.apiUrl, formData);
  }*/


  uploadFileWithProgress(file: File, userId: number, userRole: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
    formData.append('userRole', userRole);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      }).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total !== undefined && event.loaded !== undefined) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              observer.next(percentDone);
            } else {
              observer.next(-1); // No se puede calcular el progreso
            }
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body; // Obtener la respuesta del servidor
            observer.next(response); // Devuelve la respuesta del servidor al completar la carga
            observer.complete(); // Marca la observación como completa
          } else {
            observer.next(-1); // Indicador de progreso desconocido
          }
        },
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))// Propagar errores al observador
      );
    });
  }


  //Curso Profesor
  uploadFileWithProgressCurso(file: File, SubjectId: number, userRole: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', SubjectId.toString());
    formData.append('userRole', userRole);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return new Observable(observer => {
      this.http.post<any>(this.apiUrlCurso, formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      }).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total !== undefined && event.loaded !== undefined) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              observer.next(percentDone);
            } else {
              observer.next(-1); // No se puede calcular el progreso
            }
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body; // Obtener la respuesta del servidor
            observer.next(response); // Devuelve la respuesta del servidor al completar la carga
            observer.complete(); // Marca la observación como completa
          } else {
            observer.next(-1); // Indicador de progreso desconocido
          }
        },
        catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))// Propagar errores al observador
      );
    });
  }


}
