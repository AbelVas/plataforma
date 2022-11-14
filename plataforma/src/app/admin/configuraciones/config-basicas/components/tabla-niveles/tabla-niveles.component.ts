import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-tabla-niveles',
  templateUrl: './tabla-niveles.component.html',
  styleUrls: ['./tabla-niveles.component.css']
})
export class TablaNivelesComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
