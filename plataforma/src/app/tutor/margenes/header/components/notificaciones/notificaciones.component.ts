import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/web-socket.service';
import decode from 'jwt-decode';
import { NotificacionesTutorService } from 'src/app/tutor/service/notificaciones-tutor.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  cantidadNotificaciones:any='';
  //obtener el ID del usuario
  token:any = localStorage.getItem('Acces-Token');
  //coso para mostrar las horas en las notificaciones
  fechaYYYYMMDD:any=[]
  notificaciones:any=[]
  notificacionesNoVistasTexto:any=[]
  notificacionesNoVistas:any=0

  constructor(private notificacionesService: NotificacionesTutorService, private socketService: WebSocketService) { }

  ngOnInit(): void {
    const { idUsuario }: any = decode(this.token);
    const { idRol }: any = decode(this.token);
    this.getNotificacionesNoVistas(idUsuario, idRol);

    // Socket para actualizar el estado de las notificaciones
    this.socketService.escucharEvento('nueva-notificacion-usuario-recibida').subscribe((data: any) => {
      if (data.idUsuario == idUsuario && data.idRol == idRol) {
        this.notificacionesNoVistasTexto.splice(0, this.notificacionesNoVistasTexto.length);
        this.cantidadNotificaciones = '0';
        this.notificacionesNoVistas = '0';
        this.notificaciones.splice(0, this.notificaciones.length);
        this.getNotificacionesNoVistas(data.idUsuario, data.idRol);
      }
    });
  }

  convertToCentralAmericaTime(utcDate: string): string {
    const dateUTC = new Date(utcDate);
    const utcOffset = -8 * 60 * 60 * 1000; 
    const timeInUTC = dateUTC.getTime();
    const timeInCentralAmerica = timeInUTC + utcOffset;
    const dateCentralAmerica = new Date(timeInCentralAmerica);
    const formattedDate = dateCentralAmerica.toISOString().replace('T', ' ').substring(0, 19);
    return formattedDate;
  }

  getNotificacionesNoVistas(idUsuarioRecibe: string, idRolRecibe: string) {
    this.notificacionesService.notificacionesTutor(idUsuarioRecibe, idRolRecibe).subscribe(
      res => {
        this.notificaciones = res
        this.cantidadNotificaciones = this.notificaciones.length;
        for (let i = 0; i < this.cantidadNotificaciones; i++) {
          if (this.notificaciones[i]?.visto_recibe == 0) {
            this.notificacionesNoVistas++;
            const fechaCentralAmerica = this.convertToCentralAmericaTime(this.notificaciones[i].fecha_creacion);
            this.fechaYYYYMMDD.push(fechaCentralAmerica);
            this.notificacionesNoVistasTexto.push({
              titulo: this.notificaciones[i].titulo_notificacion,
              fecha: fechaCentralAmerica
            });
          }
        }
        console.log(this.notificacionesNoVistasTexto);
      },
      err => {
        console.log(err);
      }
    );
  }
}

