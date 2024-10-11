import { Component,OnInit } from "@angular/core";
import { TemaEstudianteService } from "./services/tema-estudiante.service";
import { WebSocketService } from "../web-socket.service";
import { ToastrService } from 'ngx-toastr';
import decode from 'jwt-decode';

@Component({
  selector:'app-alumno',
  templateUrl:'./student.component.html',
  styleUrls:['./student.component.css']
})
export class StudentComponent implements OnInit{

  temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    navbar1: '',
    navbar2: '',
    texto1: '',
    texto2: '',
    fondo1: '',
    estado: ''
  }

  //variables de colores
  cnavbar1:string='';
  cnavbar2:string='';
  ctexto1:string='';
  ctexto2:string='';
  cfondo1:string='';

  token:any = localStorage.getItem('Acces-Token');
  constructor( private temaEstudianteService:TemaEstudianteService,private socket:WebSocketService,private socketService:WebSocketService,private toastrService:ToastrService){}

  ngOnInit(){
    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
    const {idUsuario}:any=decode(this.token);
    const {idRol}:any=decode(this.token);
    const {rol}:any=decode(this.token);
    this.socket.emitirEvento('associateUser', { idUsuario: idUsuario,idRol:idRol,rol:rol })
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('nueva-notificacion-usuario-recibida').subscribe((data: any) => {
      if(data.idUsuario==idUsuario&&data.idRol==idRol){
        this.toastrService.success(data.mensaje, data.titulo_notificacion);//veamos
      }
    });
  }

  obtenerDatosTema(){
    this.temaEstudianteService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cnavbar1=this.temaGet[i].navbar1;
          this.cnavbar2=this.temaGet[i].navbar2;
          this.ctexto2=this.temaGet[i].texto2;
          this.cfondo1=this.temaGet[i].fondo1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }
}
