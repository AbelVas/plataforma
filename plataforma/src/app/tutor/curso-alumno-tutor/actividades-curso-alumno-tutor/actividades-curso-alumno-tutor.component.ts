import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { ActividadesCursoAlumnoTutorService } from './services/actividades-curso-alumno-tutor.service';

@Component({
  selector: 'app-actividades-curso-alumno-tutor',
  templateUrl: './actividades-curso-alumno-tutor.component.html',
  styleUrls: ['./actividades-curso-alumno-tutor.component.css']
})
export class ActividadesCursoAlumnoTutorComponent implements OnInit {

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

  datosCalificar:any={}
  @Input() idCurso:any=''
  listaCalificacionAlumno:any={
    nota:''
  }

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
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
