import { Component, OnInit } from '@angular/core';
import { TemaEstudianteService } from '../services/tema-estudiante.service';
import decode from 'jwt-decode';
import { DahboardService } from '../services/dahboard.service';

@Component({
  selector: 'app-calendario-vista-mes',
  templateUrl: './calendario-vista-mes.component.html',
  styleUrls: ['./calendario-vista-mes.component.css']
})
export class CalendarioVistaMesComponent implements OnInit {

  cantidadcursos:any=[];

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

  constructor(private temaEstudianteService:TemaEstudianteService, public cardResumenStudent:DahboardService) { }

  ngOnInit(): void {

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
    this.obtenerDatosCursos();
  }

  obtenerDatosCursos(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this. cardResumenStudent.getCursoparaAlumno(idUsuario).subscribe(
      response=>{
        this.cantidadcursos=response
      },
      error=>{
        console.log('Error: '+error);
      }
    )
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
