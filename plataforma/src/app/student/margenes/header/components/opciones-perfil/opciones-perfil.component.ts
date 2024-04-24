import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { PerfilAlumnoService } from 'src/app/student/services/perfil-alumno.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  imagenActiva:any=[]
  NombreUsuario:any=[];
  RoleUsuario:any=[];
  NombreSingular=[];
  nombre_alumno:any
  apellido_alumno:any
  rol:any

  @Input() ctexto2:string='';
  constructor(private socketService:WebSocketService,private router:Router,private perfilAlumnoService:PerfilAlumnoService) { }

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.nombre_alumno=decodedToken.nombre_profesor
    this.apellido_alumno=decodedToken.apellido_profesor

    this.NombreUsuario=this.nombre_alumno+" "+this.apellido_alumno;
    this.RoleUsuario=decodedToken.rol;
    this.NombreSingular=this.nombre_alumno;

    this.getImagenPerfil(this.idUsuario);
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-ferfil-alumno').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario)
        }
      });
  }
  getImagenPerfil(idProfesor:string) {
    this.perfilAlumnoService.getFotoALUMNO(idProfesor).subscribe(
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
  salir(){
    localStorage.removeItem('Acces-Token');
    this.router.navigate(['login']);
  }
}
