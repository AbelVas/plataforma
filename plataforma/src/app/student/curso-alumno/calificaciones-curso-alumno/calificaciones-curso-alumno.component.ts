import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { ActividadesCursoAlumnoService } from '../actividades-curso-alumno/services/actividades-curso-alumno.service';

@Component({
  selector: 'app-calificaciones-curso-alumno',
  templateUrl: './calificaciones-curso-alumno.component.html',
  styleUrls: ['./calificaciones-curso-alumno.component.css']
})
export class CalificacionesCursoAlumnoComponent implements OnInit {

  NombreUsuario:any=[];
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  constructor(public AlumnoNombreDash:ActividadesCursoAlumnoService) { }

  ngOnInit(): void {
    this.getAlumnoDash()
  }
//informacion del alumno
  getAlumnoDash(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.AlumnoNombreDash. getAlumnoNombre( idUsuario).subscribe(
      res=>{
        console.log(res)
        this.NombreUsuario=res;
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }
}
