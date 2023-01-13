import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { CalificacionesVistaEstudianteService } from './services/calificaciones-vista-estudiante.service';
import { TematutoresService } from '../dashboard/services/tematutores.service';

@Component({
  selector: 'app-calificaciones-vista-estudiante',
  templateUrl: './calificaciones-vista-estudiante.component.html',
  styleUrls: ['./calificaciones-vista-estudiante.component.css']
})
export class CalificacionesVistaEstudianteComponent implements OnInit {
  sppinerOn:boolean=true;
  idStudent:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso: '',
    nombre_curso:''
  };
  cantidad_cursos:any=[];

  alumnosGet:any=[];
  alumnoIndividual:any={
    idAlumno: '',
    nombres_alumno: '',
    apellidos_alumno: '',
    sexo: '',
    usuario: '',
    nombre_grado:'',
    seccion:''
  };

  NombreUsuario:any=[];

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

  constructor(private calificacionesVistaEstudianteService:CalificacionesVistaEstudianteService, private activedRoute:ActivatedRoute, private tematutoresService:TematutoresService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;

    const params=this.activedRoute.snapshot.params;
    this.idStudent=params['idEstudiante'];
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet

    this.obtenerAlumno();

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosCursos(idAlumno=this.idStudent){
    this.calificacionesVistaEstudianteService.getCursoporAlumno(idAlumno).subscribe(
      response=>{
        this.cursosGet=response;
        this.cantidad_cursos=response
        this.sppinerOn=false;
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

  obtenerAlumno(idAlumno=this.idStudent){
    this.calificacionesVistaEstudianteService.getAlumno(idAlumno).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

  obtenerDatosTema(){
    this.tematutoresService.getTemaActivo(this.temaactivo).subscribe(
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
