import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilAlumnoService } from './services/perfil-alumno.service';

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

  constructor( private perfilAlumnosService:PerfilAlumnoService) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.alumnoIndividual=this.alumnoGet;
    this.perfilAlumnosService.disparadorCopiarData.emit(this.alumnoIndividual);
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

}
