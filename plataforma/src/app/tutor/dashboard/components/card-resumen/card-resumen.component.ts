import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './card-resumen.component.html',
  styleUrls: ['./card-resumen.component.css']
})
export class CardResumenComponent implements OnInit {

  idTutorPrincipal:string='';
  Nombre_profesor:string='';

  alumnosGet:any=[];
  alumnoIndividual:any={
    idAlumno: '',
    nombres_alumno: '',
    apellidos_alumno: '',
    sexo: '',
    usuario: '',
    nombre_grado:'',
    seccion:''
  };

  constructor( private dashboardService:DashboardService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor, idUsuario}:any=decode(token);
    this.Nombre_profesor=nombre_profesor;
    this.idTutorPrincipal=idUsuario;

    this.obtenerDatosAlumnos();
    this.alumnoIndividual=this.alumnosGet

  }

  obtenerDatosAlumnos(){
    this.dashboardService.getAlumnoporTutor(this.idTutorPrincipal).subscribe(
      response=>{
        this.alumnosGet=response;
        console.log('Alumnos: '+response)
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
