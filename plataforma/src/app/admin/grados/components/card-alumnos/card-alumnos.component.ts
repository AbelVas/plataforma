import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-alumnos-grado-admin',
  templateUrl: './card-alumnos.component.html',
  styleUrls: ['./card-alumnos.component.css']
})
export class CardAlumnosComponent implements OnInit {
  listaAlumnos:any=[]
  @Input() alumnos:any=[{}];
  constructor() { }

  ngOnInit(): void {
    this.listaAlumnos=this.alumnos
    console.log(this.listaAlumnos)
  }

}
