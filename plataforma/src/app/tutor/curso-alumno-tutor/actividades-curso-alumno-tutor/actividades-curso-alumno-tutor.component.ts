import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { S } from '@fullcalendar/core/internal-common';
import decode from 'jwt-decode';
import { ActividadesCursoAlumnoTutorService } from './services/actividades-curso-alumno-tutor.service';

@Component({
  selector: 'app-actividades-curso-alumno-tutor',
  templateUrl: './actividades-curso-alumno-tutor.component.html',
  styleUrls: ['./actividades-curso-alumno-tutor.component.css']
})
export class ActividadesCursoAlumnoTutorComponent implements OnInit {
  sppinerOn:boolean=true;
  idEstudiante:string='';
  calificacionesGet:any=[];
  calificacionIndividual:any={
    idDetalleActividad:'',
    nombre_actividad:'',
    detalle:'',
    idTipoActividad:'',
    valor:'',
    idUnidad:'',
    nota:''
  }

  idCursoCurso:string='';
  foros:any=[];
  tareas:any=[];
  cantidad_foros:any=[];
  cantidad_tareas:any=[];

  colorprogress:any=[];
  suma:any=0;

  constructor( private actividadesCursoAlumnoTutorService:ActividadesCursoAlumnoTutorService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idEstudiante=params['idAlumno'];
    this.idCursoCurso=params['idCurso'];
    this.calificacionIndividual=this.calificacionesGet;
    this.getCalificacionesAlumno(this.idCursoCurso,this.idEstudiante);
  }

  getCalificacionesAlumno(idCursoAc:string,idAlumnito:string){
    var datoParaNota:any={};
    datoParaNota.idCurso=idCursoAc;
    datoParaNota.idAlumno=idAlumnito;
      this.actividadesCursoAlumnoTutorService.getCalificacionesAlumno(idAlumnito,datoParaNota).subscribe(
      res=>{
        this.sppinerOn=false;
        var cantidad=res.length;
        this.calificacionesGet=res;
        var AuxForos=0;
        var AuxTareas=0;
        for(let i = 0; i<cantidad; i++){
          if(this.calificacionesGet[i].idTipoActividad=='1'){
            this.tareas[AuxTareas]=this.calificacionesGet[i]
            AuxTareas++;
            this.cantidad_tareas=this.tareas
          }else{
            this.foros[AuxForos]=this.calificacionesGet[i]
            AuxForos++;
            this.cantidad_foros=this.foros
          }
        }
        for(let i=0; i<res.length; i++){
          this.suma=res[i].nota+this.suma
          if(this.suma>100){
            this.suma=100
          }
        }

        if(this.suma==69 || this.suma<69){
          this.colorprogress='red';
        }else{
          if(this.suma==70 || (this.suma>70 && this.suma<81)){
            this.colorprogress='orange';
          }else{
            if(this.suma==81 || (this.suma>81 && this.suma<91)){
              this.colorprogress='gold';
            }else{
              if(this.suma>90){
                this.colorprogress='green';
              }
            }
          }
        }
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }
  buscarActividadArray(idActividad:string){
    this.calificacionIndividual=this.calificacionesGet.find((x:any)=>x.idDetalleActividad===idActividad)
  }

}
