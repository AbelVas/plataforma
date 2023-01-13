import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  dataAdmin:any={
    nombre_profesor:'',
    apellido_profesor:'',
    imagen:''
  }
  ngOnInit(): void {

  }
  getEvent(e:any){
    this.dataAdmin.nombre_profesor=e[0].nombre_profesor
    this.dataAdmin.apellido_profesor=e[0].apellido_profesor
    this.dataAdmin.imagen=e[0].imagen
  }
  getEvent2(e:any){
    this.dataAdmin.imagen=e.imagen
  }
  getEvent3(e:any){
    console.log('asdasd')
  }
}
