import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { GradoGuiaProfesorService } from './services/grado-guia-profesor.service';


@Component({
  selector: 'app-grado-guia-profesor',
  templateUrl: './grado-guia-profesor.component.html',
  styleUrls: ['./grado-guia-profesor.component.css']
})
export class GradoGuiaProfesorComponent implements OnInit {
  
  token:any=localStorage.getItem('Acces-Token');
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:''
  };

  GradoGuiaget:any=[];
  GradoGuiaIndividual:any={
    idGuias:'',
    idProfesor:'',
    idGrado:''
  }
  EstudiantesGet:any=[];
  EstudiantesTodos:any={
    idAlumno:'',
    nombres_Alumno:'',
    apellidos_Alumno:''
  }
  listaalumnos:any=[]
  gradosGet:any=[]

  constructor( private gradoGuiaProfesorService:GradoGuiaProfesorService ) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.obtenerGradoGuia();
    this.profesorIndividual=this.profesorGet
    this.gradoGuiaProfesorService.disparadorCopiarData.emit(this.profesorIndividual);
    this.GradoGuiaIndividual=this.GradoGuiaget
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.gradoGuiaProfesorService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerGradoGuia(){
    const{idUsuario}:any=decode(this.token);
    this.gradoGuiaProfesorService.getGradoGuia(idUsuario).subscribe(
      response=>{
        this.gradosGet=response;  
        console.log(this.gradosGet[0].idGrado)
        this.obtenerEstudiantesGuiaGrado(this.gradosGet[0].idGrado)
      },
      error=>{
        console.log('Error: '+ error)
      }
    )
  }

  obtenerEstudiantesGuiaGrado(idGrado:string){
    this.gradoGuiaProfesorService.getEstudiantesGuiaGrado(idGrado).subscribe(
      response=>{
        this.listaalumnos=response;
        console.log(this.listaalumnos)
      },
      error=>{
        console.log('Error: '+ error)
      }
    )
  }

}
