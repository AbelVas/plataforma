import { Component, OnInit } from '@angular/core';
import { NotificacionesStudentService } from 'src/app/student/services/notificaciones-student.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { ToastrService } from 'ngx-toastr';
import decode from 'jwt-decode';

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



  constructor(private notificacionesService:NotificacionesStudentService,private socketService:WebSocketService) { }

  ngOnInit(): void {
    const {idUsuario}:any=decode(this.token);
    const {idRol}:any=decode(this.token);
    this.getNotificacionesNoVistas(idUsuario,idRol)

    //socket para actualizar el estado de las notificaciones
    this.socketService.escucharEvento('nueva-notificacion-usuario-recibida').subscribe((data: any) => {
      if(data.idUsuario==idUsuario&&data.idRol==idRol){
        //this.toastrService.success(data.mensaje, 'Atención!');//veamos
        this.notificacionesNoVistasTexto.splice(0, this.notificacionesNoVistasTexto.length);
        this.cantidadNotificaciones='0'
        this.notificacionesNoVistas='0'
        this.notificaciones.splice(0,this.notificaciones.length)
        this.getNotificacionesNoVistas(data.idUsuario,data.idRol);
      }
    });
  }

  convertToCentralAmericaTime(utcDate: string): string {
    // Parsea la fecha UTC a un objeto Date
    const dateUTC = new Date(utcDate);
    // Calcula el UTC offset para la hora en Centroamérica (UTC-6)
    const utcOffset = -8 * 60 * 60 * 1000; // -6 horas en milisegundos para centro america, uso -8 porque la hora del server está adelantada por en dos
    // Calcula el tiempo en milisegundos desde el 01/01/1970 en UTC
    const timeInUTC = dateUTC.getTime();
    // Aplica el UTC offset para obtener la hora en Centroamérica
    const timeInCentralAmerica = timeInUTC + utcOffset;
    // Crea un nuevo objeto Date con la hora en Centroamérica
    const dateCentralAmerica = new Date(timeInCentralAmerica);
    // Formatea la fecha y hora en el formato deseado (por ejemplo, 'YYYY-MM-DD HH:mm:ss')
    const formattedDate = dateCentralAmerica.toISOString().replace('T', ' ').substring(0, 19);

    return formattedDate;
  }
  getNotificacionesNoVistas(idUsuarioRecibe:string,idRolRecibe:string){
    this.notificacionesService.notificacionesDocentes(idUsuarioRecibe,idRolRecibe).subscribe(
      res=>{
        this.notificaciones=res
        this.cantidadNotificaciones=this.notificaciones.length
          for (let i = 0; i < this.cantidadNotificaciones; i++) {
                if (this.notificaciones[i]?.visto_recibe == 0) {
                  this.notificacionesNoVistas++;
                  var fechaCentralAmerica = this.convertToCentralAmericaTime(this.notificaciones[i].fecha_creacion);
                  this.fechaYYYYMMDD.push(fechaCentralAmerica);
                  this.notificacionesNoVistasTexto.push({
                    titulo: this.notificaciones[i].titulo_notificacion,
                    fecha: fechaCentralAmerica
                  });
                }
              }
              
      },
      err=>{
        console.log(err)
      }
    )
  }

}
