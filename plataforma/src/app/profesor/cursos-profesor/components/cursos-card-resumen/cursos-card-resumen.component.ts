import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from 'src/app/profesor/services/card-resumen.service';

@Component({
  selector: 'app-cursos-card-resumen',
  templateUrl: './cursos-card-resumen.component.html',
  styleUrls: ['./cursos-card-resumen.component.css']
})
export class CursosCardResumenComponent implements OnInit {

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute ) { }
  sppinerOn:boolean=true;
  idGradoCurso:string='';
  idCursoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:''
  }
  listaActividades:any=[]
  cantidad_alumnos:any=[];
  cantidad_tareas:any=[];

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.idCursoCurso=params['idCurso'];
    this.obtenerAlumnosCursos();
    this.obtenerTareasCursos();
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
        this.cantidad_alumnos=response;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  obtenerTareasCursos(idCursoAl=this.idCursoCurso){
    this.cardResumenService.getTareasCurso(idCursoAl).subscribe(
      res=>{
        this.listaActividades=res
        this.sppinerOn=false;
        this.cantidad_tareas=res
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }

}
