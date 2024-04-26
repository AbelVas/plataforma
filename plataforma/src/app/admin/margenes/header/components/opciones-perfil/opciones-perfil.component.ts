import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from "jwt-decode"
import { ToastrService } from 'ngx-toastr';
import { ImagenesPerfilDefectoService } from 'src/app/admin/services/imagenes-perfil-defecto.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-admin-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  imagenActiva:any=[]
  //datos para el minislide
  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';
  ImagenOriginal='';
  imagenNueva='';
  Imagen: string | null | undefined;
  constructor(private router:Router,private socketService:WebSocketService,private toastrService:ToastrService,private imagenesPerfil: ImagenesPerfilDefectoService) { }
  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.Nombre_profesor=decodedToken.nombre_profesor
    this.Apellido_profesor=decodedToken.apellido_profesor
    this.Rol=decodedToken.rol
    this.getImagenPerfil()
    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-perfil-admin').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil()
        }
      });
  }

  getImagenPerfil() {
    this.imagenesPerfil.getFotoAdmin(this.idUsuario).subscribe(
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
