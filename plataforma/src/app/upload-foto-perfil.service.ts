import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFotoPerfilService {

    //private apiUrl = 'http://localhost/backendimagenes/manejo-archivos.php';
    private apiUrl = 'manejo-archivos.php'; //<-en producción

  constructor(private http: HttpClient,private errorHandler: ManejoDeErroresService) { }


  convertirTamanoABytes(tamano: string): number {
    const unidades:any = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 };
    const matches = tamano.match(/(\d+)\s*(B|KB|MB|GB)/);
    if (matches && matches.length === 3) {
      const valor = parseInt(matches[1], 10);
      const unidad = matches[2];
      return valor * unidades[unidad];
    }
    return 0; // Retornar 0 si el formato es incorrecto o no se puede convertir
  }

  uploadFileWithProgress(file: File, userId: any, userRole: string,tipoSubida:any,allowedExtensions:string[],tamanoMaximo:any,parametroExtraParaCarpeta?:string): Observable<any> {

    console.log(allowedExtensions)
    //vamos a validar el tipo de subida:
      if(tipoSubida=='foto-perfil-usuario'||tipoSubida=='foto-curso'){
        const fileExtension:any = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return throwError('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '));
        }
      }else if(tipoSubida=='renas'||tipoSubida=='policiacos'||tipoSubida=='penales'){
        const fileExtension:any = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return throwError('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '));
        }
      }else if(tipoSubida=='recurso' || tipoSubida=='anuncio'||tipoSubida=='tarea'){
        const fileExtension:any = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return throwError('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '));
        }
      }

      const maxSizeInBytes = this.convertirTamanoABytes(tamanoMaximo);
      if (file.size > maxSizeInBytes) {
        return throwError('El tamaño del archivo supera el límite permitido de:'+(tamanoMaximo)+'.');
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
  deleteFile(fileUrl: string,tipoSubida:string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}?ruta=${encodeURIComponent(fileUrl)}&renaspoliciacospenales=${tipoSubida}`, {
      headers: headers,
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
