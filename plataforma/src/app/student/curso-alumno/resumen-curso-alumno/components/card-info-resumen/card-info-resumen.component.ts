import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { ResumenCursoAlumnoService } from '../../../../services/resumen-curso-alumno.service';

@Component({
  selector: 'app-card-info-resumen',
  templateUrl: './card-info-resumen.component.html',
  styleUrls: ['./card-info-resumen.component.css']
})
export class CardInfoResumenComponent implements OnInit {
  sppinerOn:boolean=true;
  ActividadesInfo:any=[];
  Tareas:any=[];
  Foro:any=[];
  Examen:any=[];
  idCurso:any;
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  constructor(public ruta:ActivatedRoute, public resumenCurso:ResumenCursoAlumnoService) { }

  ngOnInit(): void {
    this.obtenerExamen()
    this.obtenerTarea()
    this.obtenerForo()
  }

  obtenerExamen(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.resumenCurso.getActividadPorTipoExamen(this.idCurso, idUsuario).subscribe(
      response=>{
        this.Examen=response
        this.sppinerOn=false;
        },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

  obtenerTarea(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.resumenCurso.getActividadPorTipoTarea(this.idCurso, idUsuario).subscribe(
      response=>{
        this.Tareas=response
        this.sppinerOn=false;
        },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

  obtenerForo(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.resumenCurso.getActividadPorTipoForo(this.idCurso, idUsuario).subscribe(
      response=>{
        this.Foro=response
        this.sppinerOn=false;
        },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

}
