import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CalificacionesAlumnoTutorService } from './services/calificaciones-alumno-tutor.service';

@Component({
  selector: 'app-calificaciones-alumno-tutor',
  templateUrl: './calificaciones-alumno-tutor.component.html',
  styleUrls: ['./calificaciones-alumno-tutor.component.css']
})
export class CalificacionesAlumnoTutorComponent implements OnInit {

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
  constructor( private calificacionesAlumnoTutorService:CalificacionesAlumnoTutorService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
    const {idUsuario}: any=decode(token);
    this.idTutorPrincipal=idUsuario;

    this.obtenerDatosAlumnos();
    this.alumnoIndividual=this.alumnosGet
  }

  obtenerDatosAlumnos(){
    this.calificacionesAlumnoTutorService.getAlumnoporTutor(this.idTutorPrincipal).subscribe(
      response=>{
        this.alumnosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
