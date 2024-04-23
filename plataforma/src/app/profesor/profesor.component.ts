import { Component,OnInit } from "@angular/core";
import { TemaProfesorService } from "./services/tema-profesor.service";
import { WebSocketService } from 'src/app/web-socket.service';
import { ToastrService } from 'ngx-toastr';
import decode from 'jwt-decode';

@Component({
  selector:'app-profesor',
  templateUrl:'./profesor.component.html',
  styleUrls:['./profesor.component.css']
})
export class ProfesorComponent implements OnInit{

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
    texto2: '',
    fondo1: '',
    estado: ''
  }
  //obtener el ID del usuario
  token:any = localStorage.getItem('Acces-Token');

  //variables de colores
  cnavbar1:string='';
  cnavbar2:string='';
  ctexto2:string='';
  cfondo1:string='';

  constructor(private socket:WebSocketService,private socketService:WebSocketService,private temaProfesorService:TemaProfesorService,private toastrService:ToastrService){}

  ngOnInit(){
    const {idUsuario}:any=decode(this.token);
    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet;
    const {idRol}:any=decode(this.token);
    const {rol}:any=decode(this.token);
    //asociamos el socket al usuario
    this.socket.emitirEvento('associateUser', { idUsuario: idUsuario,idRol:idRol,rol:rol })
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('nuevo-grado-guia-asignado').subscribe((data: any) => {
      if(data.usuario==idUsuario){
        this.toastrService.success(data.mensaje, 'Atención!');//veamos
      }
    });
  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
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
