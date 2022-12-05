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

  constructor( private gradoGuiaProfesorService:GradoGuiaProfesorService ) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.gradoGuiaProfesorService.disparadorCopiarData.emit(this.profesorIndividual);
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.gradoGuiaProfesorService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.gradoGuiaProfesorService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
