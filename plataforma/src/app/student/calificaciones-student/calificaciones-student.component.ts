import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CalificacionesStudentService } from './services/calificaciones-student.service';
import { TemaEstudianteService } from '../dashboard/services/tema-estudiante.service';

@Component({
  selector: 'app-calificaciones-student',
  templateUrl: './calificaciones-student.component.html',
  styleUrls: ['./calificaciones-student.component.css']
})
export class CalificacionesStudentComponent implements OnInit {
  NombreUsuario:any=[];
  errorServicio:any={};
  InfoGrado:any=[];
  errorService:any={
    codigoError:''
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

  constructor(public calificaser:CalificacionesStudentService, private temaEstudianteService:TemaEstudianteService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
    this.obtenerGrado();

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet

  }

  obtenerGrado(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.calificaser.getGrado(idUsuario).subscribe(
      response=>{
        this.InfoGrado=response
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
