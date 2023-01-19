import { Component, OnInit, Input } from '@angular/core';
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
    nota:'',
    letranota:''
  }

  idNivelNivel:any=[];

  idCursoCurso:string='';
  foros:any=[];
  tareas:any=[];
  notaActividad:any=[];

  cursosGet:any=[];
  cursosIndividual:any={
    idNivel:'',
    nombre_curso:''
  };

  letraFinal:any=[];

  colorprogress:any=[];
  suma:any=0;
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  sppinerOn:boolean=true;

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idEstudiante=idUsuario;
    const params=this.activedRoute.snapshot.params;
    this.idCursoCurso = params['id'];
    this.calificacionIndividual=this.calificacionesGet;
    this.getCalificacionesAlumno(this.idCursoCurso,this.idEstudiante);
    this.getNivel()
  }

  getNivel(idCurso=this.idCursoCurso){
    this.resumenCurso.getCurso(idCurso).subscribe(
      res=>{
        var cantidad=res.length;
        this.cursosGet=res
        for(let i = 0; i<cantidad; i++){
          this.idNivelNivel=this.cursosGet[i].idNivel;
          console.log('idNivel: '+this.idNivelNivel)
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  getCalificacionesAlumno(idCursoAc:string,idAlumnito:string){
    var datoParaNota:any={};
    datoParaNota.idCurso=idCursoAc;
    datoParaNota.idAlumno=idAlumnito;
      this.resumenCurso.getCalificacionesAlumno(idAlumnito,datoParaNota).subscribe(
      res=>{
        var porcentaje:any
        for(let i=0; i<res.length; i++){

          porcentaje=(res[i].nota*100)/res[i].valor

          if(porcentaje==69 || porcentaje<69){
            res[i].letranota='DM - Debe Mejorar'
          }else{
            if(porcentaje==70 || porcentaje>70 && porcentaje<81){
              res[i].letranota='B - Bueno'
            }else{
              if(porcentaje==81 || porcentaje>81 && porcentaje<91){
                res[i].letranota='MB - Muy bueno'
              }else{
                if(porcentaje>90){
                  res[i].letranota='E - Excelente'
                }
              }
            }
          }
        }

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
          this.letraFinal='DM - Debe Mejorar'
        }else{
          if(this.suma==70 || (this.suma>70 && this.suma<81)){
            this.colorprogress='orange';
            this.letraFinal='B - Bueno'
          }else{
            if(this.suma==81 || (this.suma>81 && this.suma<91)){
              this.colorprogress='gold';
              this.letraFinal='MB - Muy bueno'
            }else{
              if(this.suma>90){
                this.colorprogress='green';
                this.letraFinal='E - Excelente'
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
