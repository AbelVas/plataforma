import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFotoPerfilService {

      private apiUrl = 'http://localhost/backendimagenes/subida-archivos.php';
    //private apiUrl = 'server/subida-archivos.php'; //<-en producción

  constructor(private http: HttpClient,private errorHandler: ManejoDeErroresService) { }

  uploadFileWithProgress(file: File, userId: any, userRole: string,tipoSubida:any,parametroExtraParaCarpeta?:string): Observable<any> {

      //vamos a validar el tipo de subida:
      if(tipoSubida=='foto-perfil-usuario'||tipoSubida=='foto-curso'){
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension:any = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return throwError('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '));
        }
      }else if(tipoSubida=='renas'||tipoSubida=='policiacos'||tipoSubida=='penales'){
        const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'];
        const fileExtension:any = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return throwError('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '));
        }
      }
      // Validar peso del archivo
      const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSizeInBytes) {
        return throwError('El tamaño del archivo supera el límite permitido (10MB).');
      }
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('userId', userId);
      formData.append('userRole', userRole);
      formData.append('tipoSubida', tipoSubida);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      if (parametroExtraParaCarpeta !== undefined) {
        formData.append('parametroExtraParaCarpeta', parametroExtraParaCarpeta);
      }
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
        );});
  }

}
