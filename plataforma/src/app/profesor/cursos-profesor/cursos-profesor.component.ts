import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from '../dashboard/services/card-resumen.service';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.component.html',
  styleUrls: ['./cursos-profesor.component.css']
})
export class CursosProfesorComponent implements OnInit {

  idClase:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nombre_curso:'',
    abreviatura:''
  };
  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idClase=params['idCurso'];
    this.idGradoCurso=params['idGrado'];
    this.obtenerDatosCursos();
    this.obtenerAlumnosCursos();
  }

  obtenerDatosCursos(idCurso=this.idClase){
    this.cardResumenService.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
      }
    )

  }

}
