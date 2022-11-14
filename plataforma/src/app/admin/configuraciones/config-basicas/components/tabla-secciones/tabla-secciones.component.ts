import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-tabla-secciones',
  templateUrl: './tabla-secciones.component.html',
  styleUrls: ['./tabla-secciones.component.css']
})
export class TablaSeccionesComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
