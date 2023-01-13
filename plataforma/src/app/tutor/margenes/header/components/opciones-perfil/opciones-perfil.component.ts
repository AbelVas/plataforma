import { Component, OnInit, Input } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-opciones-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {
  NombreUsuario:any=[];

  @Input() ctexto2:string='';
  constructor() { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
  }

}
