import { Component, OnInit } from '@angular/core';
import { TemaEstudianteService } from '../services/tema-estudiante.service';

@Component({
  selector: 'app-calendario-student',
  templateUrl: './calendario-student.component.html',
  styleUrls: ['./calendario-student.component.css']
})

export class CalendarioStudentComponent implements OnInit {

  temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    fondo1: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  ctexto1:string='';

  constructor(private temaEstudianteService:TemaEstudianteService) { }

  ngOnInit(): void {

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet

  }
  obtenerDatosTema(){
    this.temaEstudianteService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
