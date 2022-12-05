import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:''
  };

  constructor( private cursosService:CursosService ) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.cursosService.disparadorCopiarData.emit(this.profesorIndividual);
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.cursosService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.cursosService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
