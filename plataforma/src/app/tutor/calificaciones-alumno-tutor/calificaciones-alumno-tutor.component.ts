import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CalificacionesAlumnoTutorService } from './services/calificaciones-alumno-tutor.service';
import { TematutoresService } from '../dashboard/services/tematutores.service';

@Component({
  selector: 'app-calificaciones-alumno-tutor',
  templateUrl: './calificaciones-alumno-tutor.component.html',
  styleUrls: ['./calificaciones-alumno-tutor.component.css']
})
export class CalificacionesAlumnoTutorComponent implements OnInit {
  sppinerOn:boolean=true;
  idTutorPrincipal:string='';
  Nombre_profesor:string='';

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
    fondo2: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor( private calificacionesAlumnoTutorService:CalificacionesAlumnoTutorService, private tematutoresService:TematutoresService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
    const {idUsuario}: any=decode(token);
    this.idTutorPrincipal=idUsuario;

    this.obtenerDatosAlumnos();
    this.alumnoIndividual=this.alumnosGet

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosAlumnos(){
    this.calificacionesAlumnoTutorService.getAlumnoporTutor(this.idTutorPrincipal).subscribe(
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
