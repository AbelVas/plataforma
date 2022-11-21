import { Component, OnInit } from '@angular/core';
import decode from "jwt-decode"

@Component({
  selector: 'app-admin-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  usuario:any;
  nombre_profesor:any;
  constructor() { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {usuario,nombre_profesor}:any=decode(token);
  }

}
