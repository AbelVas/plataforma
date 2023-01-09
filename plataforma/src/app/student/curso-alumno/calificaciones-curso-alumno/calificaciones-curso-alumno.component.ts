import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { ActividadesCursoAlumnoService } from '../actividades-curso-alumno/services/actividades-curso-alumno.service';
import { ResumenCursoAlumnoService } from '../resumen-curso-alumno/services/resumen-curso-alumno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificaciones-curso-alumno',
  templateUrl: './calificaciones-curso-alumno.component.html',
  styleUrls: ['./calificaciones-curso-alumno.component.css']
})
export class CalificacionesCursoAlumnoComponent implements OnInit {
  idCurso:any;
  total:any=[];
  CalificacionTotal:any=[];
  CalificacionCursos:any=[];
  NombreUsuario:any=[];
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  constructor(public ruta:ActivatedRoute ,public AlumnoNombreDash:ActividadesCursoAlumnoService, public calificacionesSer:ResumenCursoAlumnoService) { }

  ngOnInit(): void {
    this.getAlumnoDash()
    this.obtenerCalificacionesDelCurso()
    this.obtenerCalificacionesTotalesDelCurso()
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

  obtenerCalificacionesDelCurso(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.calificacionesSer.getActividadCalificaciones(this.idCurso, idUsuario).subscribe(
      response=>{
        this.CalificacionCursos=response
        },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerCalificacionesTotalesDelCurso(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.calificacionesSer.getActividadCalificacionTotal(this.idCurso, idUsuario).subscribe(
      response=>{
        this.CalificacionTotal=response
        },
      error=>{
        console.log('Error: '+error);
      }
    )
  }
}
