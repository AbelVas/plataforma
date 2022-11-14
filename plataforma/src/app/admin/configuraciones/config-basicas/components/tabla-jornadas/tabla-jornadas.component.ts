import { Component, OnInit,ElementRef } from '@angular/core';
import { JornadasService } from '../../services/jornadas.service';

@Component({
  selector: 'app-admin-tabla-jornadas-config',
  templateUrl: './tabla-jornadas.component.html',
  styleUrls: ['./tabla-jornadas.component.css']
})
export class TablaJornadasComponent implements OnInit {
  jornadasGet:any=[];
  errorGetJornadas:any='';

  constructor(private elementRef:ElementRef, private jornadaService:JornadasService) { }
  ngOnInit(): void {

    this.obtenerJornadas()
  }
  obtenerJornadas(){
    this.jornadaService.getJornadas().subscribe(
      response=>{
        this.jornadasGet=response;
      },
      error=>{
        this.errorGetJornadas=error;
      }
    )
  }
}
