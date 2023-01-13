import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { ResumenCursoAlumnoService } from '../resumen-curso-alumno/services/resumen-curso-alumno.service';

@Component({
  selector: 'app-actividades-curso-alumno',
  templateUrl: './actividades-curso-alumno.component.html',
  styleUrls: ['./actividades-curso-alumno.component.css']
})
export class ActividadesCursoAlumnoComponent implements OnInit {

  constructor(public activedRoute:ActivatedRoute, public resumenCurso:ResumenCursoAlumnoService) { }
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
  notaActividad:any=[];

  colorprogress:any=[];
  suma:any=0;
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  sppinerOn:boolean=true;

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idEstudiante=idUsuario;
    const params=this.activedRoute.snapshot.params;
    this.idCursoCurso = params['id'];
    this.calificacionIndividual=this.calificacionesGet;
    this.getCalificacionesAlumno(this.idCursoCurso,this.idEstudiante);
    console.log(this.tareas)
  }

  getCalificacionesAlumno(idCursoAc:string,idAlumnito:string){
    var datoParaNota:any={};
    datoParaNota.idCurso=idCursoAc;
    datoParaNota.idAlumno=idAlumnito;
      this.resumenCurso.getCalificacionesAlumno(idAlumnito,datoParaNota).subscribe(
      res=>{
        var cantidad=res.length;
        this.calificacionesGet=res;
        var AuxForos=0;
        var AuxTareas=0;
        for(let i = 0; i<cantidad; i++){
          if(this.calificacionesGet[i].idTipoActividad=='1'){
            this.tareas[AuxTareas]=this.calificacionesGet[i]
            AuxTareas++;
          }else{
            this.foros[AuxForos]=this.calificacionesGet[i]
            AuxForos++;
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
      }
    )
  }
  buscarActividadArray(idActividad:string){
    this.calificacionIndividual=this.calificacionesGet.find((x:any)=>x.idDetalleActividad===idActividad)
  }



}
