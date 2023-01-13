import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opciones-curso',
  templateUrl: './opciones-curso.component.html',
  styleUrls: ['./opciones-curso.component.css']
})
export class OpcionesCursoComponent implements OnInit {

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
