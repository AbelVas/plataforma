import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { ActividadesCursoAlumnoTutorService } from '../../../actividades-curso-alumno-tutor/services/actividades-curso-alumno-tutor.service';

@Component({
  selector: 'app-card-info-resumen',
  templateUrl: './card-info-resumen.component.html',
  styleUrls: ['./card-info-resumen.component.css']
})
export class CardInfoResumenComponent implements OnInit {

  idCursoCurso:string='';
  actividadesGet:any=[];
  actividadIndividual:any={
    idDetalleActividad:''
  };
  foros:any=[];
  tareas:any=[];
  cantidad_foros:any=[];
  cantidad_tareas:any=[];

  constructor(private actividadesCursoAlumnoTutorService:ActividadesCursoAlumnoTutorService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idCursoCurso=params['idCurso'];
    this.obtenerDatosActividad();
  }

  obtenerDatosActividad(idCurso=this.idCursoCurso){
    this.actividadesCursoAlumnoTutorService.getActividadesCurso(idCurso).subscribe(
      response=>{
        var cantidad=response.length;
        this.actividadesGet=response;
        var AuxForos=0;
        var AuxTareas=0;
        for(let i = 0; i<cantidad; i++){
          if(this.actividadesGet[i].idTipoActividad=='1'){
            this.tareas[AuxTareas]=this.actividadesGet[i]
            AuxTareas++;
            this.cantidad_tareas=this.tareas
          }else{
            this.foros[AuxForos]=this.actividadesGet[i]
            AuxForos++;
            this.cantidad_foros=this.foros
          }
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
