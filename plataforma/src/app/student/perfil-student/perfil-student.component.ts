import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilAlumnoService } from './services/perfil-alumno.service';
import { TemaEstudianteService } from '../dashboard/services/tema-estudiante.service';

@Component({
  selector: 'app-perfil-student',
  templateUrl: './perfil-student.component.html',
  styleUrls: ['./perfil-student.component.css']
})
export class PerfilStudentComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  alumnoGet:any=[];
  alumnoIndividual:any={
    idAlumno: '',
    nombres_alumno:'',
    apellidos_alumno:''
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

  constructor( private perfilAlumnosService:PerfilAlumnoService, private temaEstudianteService:TemaEstudianteService) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.alumnoIndividual=this.alumnoGet;
    this.perfilAlumnosService.disparadorCopiarData.emit(this.alumnoIndividual);

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosAlumno(){
    const {idUsuario}:any=decode(this.token);
    this.perfilAlumnosService.getAlumno(idUsuario).subscribe(
      response=>{
        this.alumnoGet=response;
        this.perfilAlumnosService.disparadorCopiarData.emit({
          data:this.alumnoGet[0]
        })
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerDatosTema(){
    this.temaEstudianteService.getTemaActivo(this.temaactivo).subscribe(
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
