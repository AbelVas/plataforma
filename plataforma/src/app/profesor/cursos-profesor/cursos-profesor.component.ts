import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from '../services/card-resumen.service';
import { TemaProfesorService } from '../services/tema-profesor.service';

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
    fondo2: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute, private temaProfesorService:TemaProfesorService  ) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idClase=params['idCurso'];
    this.idGradoCurso=params['idGrado'];
    this.obtenerDatosCursos();
    this.obtenerAlumnosCursos();

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
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

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
