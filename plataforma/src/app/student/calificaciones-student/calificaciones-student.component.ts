import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CalificacionesStudentService } from './services/calificaciones-student.service';

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
  constructor(public calificaser:CalificacionesStudentService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor}:any=decode(token);
    const {apellido_profesor}: any=decode(token);
    this.NombreUsuario=nombre_profesor+" "+apellido_profesor;
    this.obtenerGrado();

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

}
