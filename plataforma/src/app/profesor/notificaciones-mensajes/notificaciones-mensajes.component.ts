import { Component, OnInit, ViewChild } from '@angular/core';
import { TemaProfesorService } from '../services/tema-profesor.service';
import { NotificacionesDocenteService } from '../services/notificaciones-docente.service';
import { WebSocketService } from 'src/app/web-socket.service';
import decode from 'jwt-decode';

interface Email {
  sender: string;
  subject: string;
  body: string;
}

@Component({
  selector: 'app-notificaciones-mensajes',
  templateUrl: './notificaciones-mensajes.component.html',
  styleUrls: ['./notificaciones-mensajes.component.css']
})
export class NotificacionesMensajesComponent implements OnInit {

  constructor(private temaProfesorService:TemaProfesorService,private notificacionesService:NotificacionesDocenteService,private socketService:WebSocketService) {

  }
  temaactivo:string='1';
  temaGet:any=[];
  temaIndividual:any={
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
  }
  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';
  //coso para configurar el apartado de notificaciones
  correos: any[] = [];
  correosEnviados:any[] = [];
  notificaciones:any=[];
  notificacionesEnviadas:any=[];
  correosPaginados: any[] = [];
  correosPaginadosEnviados: any[] = [];
  itemsPerPage: number = 10;
  itemsPerPageEnviadas: number = 10;
  currentPage: number = 1;
  currentPageEnviadas: number = 1;
  fechaYYYYMMDD:any=[]
  correoSeleccionado: any; // Variable para almacenar el correo seleccionado
  @ViewChild('emailDetailsModal') emailDetailsModal: any; // Referencia al modal
  //fin del coso para configurar notificaciones
  //obtener el ID del usuario
  token:any = localStorage.getItem('Acces-Token');

  ngOnInit() {
    const {idUsuario}:any=decode(this.token);
    const {idRol}:any=decode(this.token);
    //this.obtenerDatosTema()
    this.getNotificacionesEnviadas(idUsuario,idRol);
    this.getNotificaciones(idUsuario,idRol);
    this.actualizarCorreosPaginados()
    this.actualizarCorreosPaginadosEnviados()
        //socket para actualizar el estado de las notificaciones
        this.socketService.escucharEvento('nueva-notificacion-usuario-recibida').subscribe((data: any) => {
          if(data.idUsuario==idUsuario&&data.idRol==idRol){
            //this.toastrService.success(data.mensaje, 'Atención!');//veamos
            this.correos.splice(0, this.correos.length);
            this.correosEnviados.splice(0, this.correosEnviados.length);
            this.getNotificaciones(idUsuario,idRol);
            this.getNotificacionesEnviadas(idUsuario,idRol);
          }
        });
  }
  //aca calculo cosas desde el paginador
  minNumber(a: number, b: number): number {
    return Math.min(a, b);
  }
  totalPaginas(): number {
    return Math.ceil(this.correos.length / this.itemsPerPage);
  }
  totalPaginasEnviados(): number {
    return Math.ceil(this.correosEnviados.length / this.itemsPerPageEnviadas);
  }
  //dejo de calcular cosas en el paginador
  //abrir el modal con el correo
  abrirModal(correo: any) {
    this.correoSeleccionado = correo;
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
  getNotificaciones(idUsuarioRecibe:string,idRolRecibe:string){
    this.notificacionesService.notificacionesDocentes(idUsuarioRecibe,idRolRecibe).subscribe(
      res=>{
        this.notificaciones=res
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
              idNotificacion:this.notificaciones[i].idNotificacion
              });
          }
          this.actualizarCorreosPaginados()
      },
      err=>{
        console.log(err)
      }
    )
  }

  getNotificacionesEnviadas(idUsuarioRecibe:string,idRolRecibe:string){
    this.notificacionesService.notificacionesEnviadas(idUsuarioRecibe,idRolRecibe).subscribe(
      res=>{
        this.notificacionesEnviadas=res
          for (let i = 0; i < this.notificacionesEnviadas.length; i++) {
              const fechaCentralAmerica = this.convertToCentralAmericaTime(this.notificacionesEnviadas[i].fecha_creacion);
              this.fechaYYYYMMDD.push(fechaCentralAmerica);
              this.correosEnviados.push({
              destinatario: this.notificacionesEnviadas[i].UsuarioRecibe,
              asunto: this.notificacionesEnviadas[i].titulo_notificacion,
              mensaje: this.notificacionesEnviadas[i].mensaje,
              fecha: this.fechaYYYYMMDD[i],
              visto: this.notificacionesEnviadas[i].visto_envia,
              RolRecibe: this.notificacionesEnviadas[i].RolRecibe,
              idNotificacion:this.notificacionesEnviadas[i].idNotificacion
              });
          }
          this.actualizarCorreosPaginadosEnviados()
      },
      err=>{
        console.log(err)
      }
    )
  }

  verNotificaciones(idNotificacionVista:any){
    const {idUsuario}:any=decode(this.token);
    const {idRol}:any=decode(this.token);

    this.notificacionesService.marcarComoVistasNotificacionesDocentes(idUsuario,idRol,idNotificacionVista).subscribe(
      res=>{
        this.correos.splice(0, this.correos.length);
      },
      err=>{
        console.log(err)
      }
    )

  }
   // Método para actualizar la lista de correos paginados
   actualizarCorreosPaginados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.correosPaginados = this.correos.slice(startIndex, endIndex);
  }
  // Método para cambiar a la página especificada
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


  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }
}
