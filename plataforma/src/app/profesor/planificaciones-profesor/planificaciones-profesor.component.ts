import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { PlanificacionesProfesorService } from './services/planificaciones-profesor.service';

@Component({
  selector: 'app-planificaciones-profesor',
  templateUrl: './planificaciones-profesor.component.html',
  styleUrls: ['./planificaciones-profesor.component.css']
})
export class PlanificacionesProfesorComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:''
  };

  constructor( private planificacionesProfesoresService:PlanificacionesProfesorService ) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.planificacionesProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.planificacionesProfesoresService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.planificacionesProfesoresService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
