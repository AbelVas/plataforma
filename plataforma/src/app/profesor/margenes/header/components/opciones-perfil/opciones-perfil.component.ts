import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import decode from "jwt-decode"
import { PerfilProfesorService } from 'src/app/profesor/services/perfil-profesor.service';
import { WebSocketService } from 'src/app/web-socket.service';


@Component({
  selector: 'app-teacher-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  imagenActiva:any=[]
  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';

  @Input() ctexto2:string='';

  constructor(private socketService:WebSocketService,private router:Router,private perfilProfesoresService:PerfilProfesorService) { }

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    const {usuario,nombre_profesor,rol,apellido_profesor}:any=decode(this.token);
    this.Usuario=usuario;
    this.Nombre_profesor=nombre_profesor;
    this.Rol=rol
    this.Apellido_profesor=apellido_profesor
    this.getImagenPerfil(this.idUsuario);
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-ferfil-profesor').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario)
        }
      });
  }
  getImagenPerfil(idProfesor:string) {
    this.perfilProfesoresService.getFotoPROFE(idProfesor).subscribe(
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
