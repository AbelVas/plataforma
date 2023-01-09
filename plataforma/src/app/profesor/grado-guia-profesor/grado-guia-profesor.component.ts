import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { GradoGuiaProfesorService } from './services/grado-guia-profesor.service';


@Component({
  selector: 'app-grado-guia-profesor',
  templateUrl: './grado-guia-profesor.component.html',
  styleUrls: ['./grado-guia-profesor.component.css']
})
export class GradoGuiaProfesorComponent implements OnInit {

  idProfesor:string='';
  Nombre_profesor:string='';
  Apellido_profesor:string='';

  idGradoCurso:string='';
  gradoguiaGet:any=[];
  gradoguiaIndividual:any={
    idGuias:'',
    idGrado:'',
    nombre_grado:'',
    seccion:'',
    jornada:'',
    nivel:''
  }

  constructor( private gradoGuiaProfesorService:GradoGuiaProfesorService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario,nombre_profesor,apellido_profesor}:any=decode(token);
    this.idProfesor=idUsuario;
    this.Nombre_profesor=nombre_profesor;
    this.Apellido_profesor=apellido_profesor

    this.obtenerGradoGuia();
  }

  obtenerGradoGuia(iddelProfesor=this.idProfesor){
    this.gradoGuiaProfesorService.getGradoGuiaProfesor(iddelProfesor).subscribe(
      response=>{
        this.gradoguiaGet=response;
      }
    )
  }

}
