import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistaEstudianteService } from '../../services/vista-estudiante.service';

@Component({
  selector: 'app-contenido-vista-estudiante',
  templateUrl: './contenido-vista-estudiante.component.html',
  styleUrls: ['./contenido-vista-estudiante.component.css']
})
export class ContenidoVistaEstudianteComponent implements OnInit {

  idStudent:string='';
  estudianteGet:any=[];
  estudianteIndividual:any={
    idAlumno: '',
    nombres_alumno: '',
    apellidos_alumno: '',
    sexo: '',
    usuario: ''
  };
  cursosGet:any=[];
  cursosIndividual:any={
    nombre_curso:'',
    profesor:'',
    idAlumno:''
  };

  constructor(private vistaEstudianteService:VistaEstudianteService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idStudent=params['idEstudiante'];
    this.obtenerAlumno();
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet
  }

  obtenerAlumno(idAlumno=this.idStudent){
    this.vistaEstudianteService.getAlumno(idAlumno).subscribe(
      response=>{
        this.estudianteGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerDatosCursos(idAlumno=this.idStudent){
    this.vistaEstudianteService.getCursoporAlumno(idAlumno).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
