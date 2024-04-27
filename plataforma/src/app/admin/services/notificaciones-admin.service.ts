import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs';
import { ManejoDeErroresService } from 'src/app/manejo-de-errores.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesAdminService {
  URL=environment.url
  constructor(private http:HttpClient,private errorHandler: ManejoDeErroresService) { }

  notificacionesDocentes(idAdminRecibe:string,idRolRecibe:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/notificacionesGenerales/notificaciones-docente/${idAdminRecibe}/${idRolRecibe}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  notificacionesEnviadas(idProfesorEnvia:string,idRolEnvia:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.get(`${this.URL}/notificacionesGenerales/notificaciones-Enviadas/${idProfesorEnvia}/${idRolEnvia}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }

  marcarComoVistasNotificacionesDocentes(idAdminRecibe:string,idRolRecibe:string,idNotificacionVista:string){
    const httpOptions={headers:new HttpHeaders({'Auth-Token':`${localStorage['Acces-Token']}`})}
    return this.http.post(`${this.URL}/notificacionesGenerales/notificaciones-docente-vistas/${idAdminRecibe}/${idRolRecibe}/${idNotificacionVista}`,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleHttpError(error))
    );
  }
}
