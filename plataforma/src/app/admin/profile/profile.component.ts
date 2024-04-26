import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { WebSocketService } from 'src/app/web-socket.service';
import { ImagenesPerfilDefectoService } from '../services/imagenes-perfil-defecto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  rol:any
  imagenActiva:any=[]

  constructor(private socketService:WebSocketService,private toastrService:ToastrService, private imagenesPerfil: ImagenesPerfilDefectoService) { }

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.rol=decodedToken.rol
    this.getImagenPerfil();
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

}
