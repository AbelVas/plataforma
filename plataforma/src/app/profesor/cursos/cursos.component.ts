import { Component, OnInit } from '@angular/core';
import decode from "jwt-decode"

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';

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
