import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesTutorService {
  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  notificacionesTutor (idAdminRecibe:string,idRolRecibe:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/notificacionesGenerales/notificaciones-docente/${idAdminRecibe}/${idRolRecibe}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  marcarComoVistasNotificacionesTutores(idAdminRecibe:string,idRolRecibe:string,idNotificacionVista:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/notificacionesGenerales/notificaciones-docente-vistas/${idAdminRecibe}/${idRolRecibe}/${idNotificacionVista}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
