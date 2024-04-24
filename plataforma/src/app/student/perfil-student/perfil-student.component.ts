import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilAlumnoService } from '../services/perfil-alumno.service';
import { TemaEstudianteService } from '../services/tema-estudiante.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-perfil-student',
  templateUrl: './perfil-student.component.html',
  styleUrls: ['./perfil-student.component.css']
})
export class PerfilStudentComponent implements OnInit {

  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  rol:any
  imagenActiva:any=[]

  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  alumnoGet:any=[];
  alumnoIndividual:any={
    idAlumno: '',
    nombres_alumno:'',
    apellidos_alumno:''
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
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  ctexto1:string='';

  constructor(private socketService:WebSocketService,private perfilAlumnosService:PerfilAlumnoService, private temaEstudianteService:TemaEstudianteService) { }

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.rol=decodedToken.rol
    this.obtenerDatosAlumno();
    this.alumnoIndividual=this.alumnoGet;
    this.perfilAlumnosService.disparadorCopiarData.emit(this.alumnoIndividual);

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
    this.getImagenPerfil()
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-ferfil-alumno').subscribe((data: any) => {
    if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
      this.getImagenPerfil()
      }
    });
  }
  getImagenPerfil() {
    this.perfilAlumnosService.getFotoALUMNO(this.idUsuario).subscribe(
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
  obtenerDatosAlumno(){
    this.perfilAlumnosService.getAlumno(this.idUsuario).subscribe(
      response=>{
        this.alumnoGet=response;
        this.perfilAlumnosService.disparadorCopiarData.emit({
          data:this.alumnoGet[0]
        })
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerDatosTema(){
    this.temaEstudianteService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
