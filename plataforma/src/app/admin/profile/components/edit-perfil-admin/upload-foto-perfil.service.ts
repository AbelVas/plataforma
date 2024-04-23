import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFotoPerfilService {

  private apiUrl = 'http://localhost/backendimagenes/foto-perfil.php';
 // private apiUrl = 'serverimages/foto-perfil.php';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, userId: number, userRole: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
    formData.append('userRole', userRole);

    return this.http.post<any>(this.apiUrl, formData);
  }

  uploadFileWithProgress(file: File,userId: number, userRole: string): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('userId', userId.toString());
    formData.append('userRole', userRole);
    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Verificar si el tamaño total está definido
          const totalSize = event.total !== undefined ? event.total : file.size;
          const percentDone = Math.round(100 * event.loaded / totalSize);
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return 100; // Devuelve 100% cuando la carga está completa
        } else {
          return -1; // Indicador de progreso desconocido
        }
      })
    );
  }
}
