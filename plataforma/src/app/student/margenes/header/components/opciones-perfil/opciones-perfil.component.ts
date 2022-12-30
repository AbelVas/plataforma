import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  NombreUsuario:any=[];
  RoleUsuario:any=[];
  NombreSingular=[];
  constructor() { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    const {rol}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
    this.RoleUsuario=rol;
    this.NombreSingular=nombre_profesor;
  }

}
