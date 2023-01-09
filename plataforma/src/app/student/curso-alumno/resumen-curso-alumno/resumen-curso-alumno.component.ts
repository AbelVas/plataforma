import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DahboardService } from '../../dashboard/services/dahboard.service';

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
  constructor(public ruta:ActivatedRoute, public DahSer:DahboardService) { }

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


}
