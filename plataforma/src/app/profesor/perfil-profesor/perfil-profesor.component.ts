import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilProfesorService } from '../services/perfil-profesor.service';
import { TemaProfesorService } from '../services/tema-profesor.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  rol:any
  imagenActiva:any=[]

  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:'',
    imagen:''
  };

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

  constructor(private socketService:WebSocketService,private perfilProfesoresService:PerfilProfesorService, private temaProfesorService:TemaProfesorService ) {}

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.rol=decodedToken.rol
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.perfilProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);
    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet

    this.getImagenPerfil()
        // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-ferfil-profesor').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil()
        }
      });
  }

  getImagenPerfil() {
    this.perfilProfesoresService.getFotoPROFE(this.idUsuario).subscribe(
      res=>{
        this.imagenActiva=res
        if(this.imagenActiva[0]?.ruta_imagen==undefined){
          this.imagenActiva[0].ruta_imagen='assets/img/perfiles/sinfoto/blank_profile.png'
        }
      },
      err=>{
        console.log(err)
      }
    )
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.perfilProfesoresService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.perfilProfesoresService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
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

  getEvent(e:any){
    this.profesorIndividual.nombre_profesor=e[0].nombre_profesor
    this.profesorIndividual.apellido_profesor=e[0].apellido_profesor
  }

}
