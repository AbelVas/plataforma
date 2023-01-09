import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { VistaEstudianteService } from './services/vista-estudiante.service';

@Component({
  selector: 'app-vista-estudiante',
  templateUrl: './vista-estudiante.component.html',
  styleUrls: ['./vista-estudiante.component.css']
})
export class VistaEstudianteComponent implements OnInit {

  idStudent:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso: ''
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
  constructor( private vistaEstudianteService:VistaEstudianteService, private activedRoute:ActivatedRoute) { }

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
  }

  obtenerDatosCursos(idAlumno=this.idStudent){
    this.vistaEstudianteService.getCursoporAlumno(idAlumno).subscribe(
      response=>{
        this.cursosGet=response;
        this.cantidad_cursos=response
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerAlumno(idAlumno=this.idStudent){
    this.vistaEstudianteService.getAlumno(idAlumno).subscribe(
      response=>{
        this.alumnosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
