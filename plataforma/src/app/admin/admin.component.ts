import { Component,OnInit } from "@angular/core";
import decode from 'jwt-decode';
import { WebSocketService } from "../web-socket.service";

@Component({
  selector:'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminComponent implements OnInit{

  token:any = localStorage.getItem('Acces-Token');

  constructor(private socket:WebSocketService){}

  ngOnInit(){
    const {idUsuario}:any=decode(this.token);
    const {idRol}:any=decode(this.token);
    const {rol}:any=decode(this.token);
    this.socket.emitirEvento('associateUser', { idUsuario: idUsuario,idRol:idRol,rol:rol })
  }

}
