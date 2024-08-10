import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificacionesTutorService } from '../service/notificaciones-tutor.service';
import { WebSocketService } from 'src/app/web-socket.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-notificaciones-mensajes',
  templateUrl: './notificaciones-mensajes.component.html',
  styleUrls: ['./notificaciones-mensajes.component.css']
})
export class NotificacionesMensajesComponent implements OnInit {

  constructor(private notificacionesService: NotificacionesTutorService, private socketService: WebSocketService) { }

  // Variables del primer código
  temaactivo: string = '1';
  temaGet: any = [];
  temaIndividual: any = {
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    fondo1: '',
    fondo2: '',
    texto1: '',
    estado: ''
  };
  
  // Variables de colores
  cfondo1: string = '';
  cfondo2: string = '';
  ctexto1: string = '';

  // Variables para configurar el apartado de notificaciones
  correos: any[] = [];
  correosEnviados: any[] = [];
  notificaciones: any = [];
  notificacionesEnviadas: any = [];
  correosPaginados: any[] = [];
  correosPaginadosEnviados: any[] = [];
  itemsPerPage: number = 10;
  itemsPerPageEnviadas: number = 10;
  currentPage: number = 1;
  currentPageEnviadas: number = 1;
  fechaYYYYMMDD: any[] = [];
  correoSeleccionado: any; // Variable para almacenar el correo seleccionado
  @ViewChild('emailDetailsModal') emailDetailsModal: any; // Referencia al modal

  // Obtener el ID del usuario
  token: any = localStorage.getItem('Acces-Token');

  ngOnInit(): void {
    const { idUsuario }: any = decode(this.token);
    const { idRol }: any = decode(this.token);

    this.getNotificaciones(idUsuario, idRol);
    this.actualizarCorreosPaginados();
    this.actualizarCorreosPaginadosEnviados();

    // Socket para actualizar el estado de las notificaciones
    this.socketService.escucharEvento('nueva-notificacion-usuario-recibida').subscribe((data: any) => {
      if (data.idUsuario == idUsuario && data.idRol == idRol) {
        this.correos.splice(0, this.correos.length);
        this.correosEnviados.splice(0, this.correosEnviados.length);
        this.getNotificaciones(idUsuario, idRol);
        this.actualizarCorreosPaginados();
        this.actualizarCorreosPaginadosEnviados();
      }
    });
  }

  // Métodos del primer código
  minNumber(a: number, b: number): number {
    return Math.min(a, b);
  }

  totalPaginas(): number {
    return Math.ceil(this.correos.length / this.itemsPerPage);
  }

  totalPaginasEnviados(): number {
    return Math.ceil(this.correosEnviados.length / this.itemsPerPageEnviadas);
  }

  abrirModal(correo: any) {
    this.correoSeleccionado = correo;
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

  getNotificaciones(idUsuarioRecibe: string, idRolRecibe: string) {
    this.notificacionesService.notificacionesTutor(idUsuarioRecibe, idRolRecibe).subscribe(
      res => {
        this.notificaciones = res;
        for (let i = 0; i < this.notificaciones.length; i++) {
          const fechaCentralAmerica = this.convertToCentralAmericaTime(this.notificaciones[i].fecha_creacion);
          this.fechaYYYYMMDD.push(fechaCentralAmerica);
          this.correos.push({
            remitente: this.notificaciones[i].UsuarioEnvia,
            asunto: this.notificaciones[i].titulo_notificacion,
            mensaje: this.notificaciones[i].mensaje,
            fecha: this.fechaYYYYMMDD[i],
            visto: this.notificaciones[i].visto_recibe,
            RolEnvia: this.notificaciones[i].RolEnvia,
            idNotificacion: this.notificaciones[i].idNotificacion
          });
        }
        this.actualizarCorreosPaginados();
      },
      err => {
        console.log(err);
      }
    );
  }


  verNotificaciones(idNotificacionVista: any) {
    const { idUsuario }: any = decode(this.token);
    const { idRol }: any = decode(this.token);

    this.notificacionesService.marcarComoVistasNotificacionesTutores(idUsuario, idRol, idNotificacionVista).subscribe(
      res => {
        this.correos.splice(0, this.correos.length);
      },
      err => {
        console.log(err);
      }
    );
  }

  actualizarCorreosPaginados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.correosPaginados = this.correos.slice(startIndex, endIndex);
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
    this.actualizarCorreosPaginados();
  }

  actualizarCorreosPaginadosEnviados() {
    const startIndex = (this.currentPageEnviadas - 1) * this.itemsPerPageEnviadas;
    const endIndex = startIndex + this.itemsPerPageEnviadas;
    this.correosPaginadosEnviados = this.correosEnviados.slice(startIndex, endIndex);
  }

  cambiarPaginaEnviados(pagina: number) {
    this.currentPageEnviadas = pagina;
    this.actualizarCorreosPaginadosEnviados();
  }
}
