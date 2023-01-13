import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { GradoGuiaProfesorService } from '../services/grado-guia-profesor.service';
import { TemaProfesorService } from '../../dashboard/services/tema-profesor.service';

@Component({
  selector: 'app-grado-guia-individual',
  templateUrl: './grado-guia-individual.component.html',
  styleUrls: ['./grado-guia-individual.component.css']
})
export class GradoGuiaIndividualComponent implements OnInit {

  idProfesor:string='';
  Nombre_profesor:string='';
  Apellido_profesor:string='';

  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

  gradosGet:any=[];
  gradosIndividual:any={
    nombre_grado:''
  };

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

  constructor( private gradoGuiaProfesorService:GradoGuiaProfesorService, private activedRoute:ActivatedRoute, private temaProfesorService:TemaProfesorService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario,nombre_profesor,apellido_profesor}:any=decode(token);
    this.idProfesor=idUsuario;
    this.Nombre_profesor=nombre_profesor;
    this.Apellido_profesor=apellido_profesor

    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.obtenerAlumnosCursos();
    this.obtenerGrado();
    this.alumnosGet=this.alumnosIndividual

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerGrado(idGradoAl=this.idGradoCurso){
    this.gradoGuiaProfesorService.getGrado(idGradoAl).subscribe(
      response=>{
        this.gradosGet=response;
      }
    )
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.gradoGuiaProfesorService.getAlumnosGrado(idGradoAl).subscribe(
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
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
