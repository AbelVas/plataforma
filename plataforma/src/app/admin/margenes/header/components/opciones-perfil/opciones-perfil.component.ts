import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from "jwt-decode"

@Component({
  selector: 'app-admin-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';
  ImagenOriginal='';
  imagenNueva='';
  Imagen: string | null | undefined;
  constructor(private router:Router) { }
  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {usuario,nombre_profesor,rol,apellido_profesor,imagen}:any=decode(token);
    this.Usuario=usuario;
    this.Nombre_profesor=nombre_profesor;
    this.Rol=rol
    this.Apellido_profesor=apellido_profesor
    localStorage.setItem('ImagenPerfil',imagen);
    this.Imagen=localStorage.getItem('ImagenPerfil')
  }
  salir(){
    localStorage.removeItem('Acces-Token');
    this.router.navigate(['login']);
  }
}
