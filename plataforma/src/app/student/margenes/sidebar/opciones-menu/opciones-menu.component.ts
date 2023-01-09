import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opciones-menu',
  templateUrl: './opciones-menu.component.html',
  styleUrls: ['./opciones-menu.component.css']
})
export class OpcionesMenuComponent implements OnInit {
MenuOcultable:any;
Hola="";
Ruta:String='';

  constructor(public ruta:ActivatedRoute, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
 this.Ruta = params['dashboard'];
    if(this.Ruta =='dashboard'){
    this.Hola = 'dashboard'
    }else{
      this.Hola='curso'
    }

    const String = this.Hola
    console.log(String)
  }

}
