import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DahboardService } from '../../dashboard/services/dahboard.service';
import { TemaEstudianteService } from '../../dashboard/services/tema-estudiante.service';

@Component({
  selector: 'app-resumen-curso-alumno',
  templateUrl: './resumen-curso-alumno.component.html',
  styleUrls: ['./resumen-curso-alumno.component.css']
})
export class ResumenCursoAlumnoComponent implements OnInit {
CursoInfo:any=[];
NombreProfe:any=[];
idCurso:any;
errorServicio:any={};
errorService:any={
  codigoError:''
};

temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    fondo1: '',
    fondo2: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor(public ruta:ActivatedRoute, public DahSer:DahboardService, private temaEstudianteService:TemaEstudianteService) { }

  ngOnInit(): void {
    this.getCursoSingular()
    this.getNombreProfe()
  }

  getCursoSingular(){
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    const idUsuario = this.idCurso
    this.DahSer.getCursoEspecifico( idUsuario).subscribe(
      res=>{
        this.CursoInfo=res;
        console.log(res)
      },
      err=>{
        this.errorServicio=err;
      }
    )

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  getNombreProfe(){
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    const idUsuario = this.idCurso
    this.DahSer.getProfeCurso( idUsuario).subscribe(
      res=>{
        this.NombreProfe=res;
        console.log(res)
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }

  obtenerDatosTema(){
    this.temaEstudianteService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }


}
