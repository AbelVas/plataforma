import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { VistaEstudianteService } from './services/vista-estudiante.service';
import { TematutoresService } from '../dashboard/services/tematutores.service';

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
    seccion:'',
    codigo:''
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
  ctexto2:string='';

  constructor( private vistaEstudianteService:VistaEstudianteService, private activedRoute:ActivatedRoute, private tematutoresService:TematutoresService) { }

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

  obtenerDatosTema(){
    this.tematutoresService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
          this.ctexto2=this.temaGet[i].texto2;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
