import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'app-opciones-menu',
  templateUrl: './opciones-menu.component.html',
  styleUrls: ['./opciones-menu.component.css']
})
export class OpcionesMenuComponent implements OnInit {
MenuOcultable:any;
Hola="";
Ruta:String='';
Calendario1:any
Calendario2:any

  @Input() cnavbar2:string='';
  @Input() ctexto2:string='';

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
    this.Calendario1="0"
    this.Calendario2="1"
  }

}
