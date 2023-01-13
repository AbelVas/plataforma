import { Component, OnInit, Input } from '@angular/core';
import decode from "jwt-decode"

@Component({
  selector: 'app-teacher-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {

  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';

  @Input() ctexto2:string='';

  constructor() { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {usuario,nombre_profesor,rol,apellido_profesor}:any=decode(token);
    this.Usuario=usuario;
    this.Nombre_profesor=nombre_profesor;
    this.Rol=rol
    this.Apellido_profesor=apellido_profesor
  }

}
