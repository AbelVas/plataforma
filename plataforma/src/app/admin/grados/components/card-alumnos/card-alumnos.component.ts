import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodigosService } from 'src/app/admin/services/codigos.service';
import { GradosAlumnosService } from 'src/app/admin/services/grados-alumnos.service';

@Component({
  selector: 'app-card-alumnos-grado-admin',
  templateUrl: './card-alumnos.component.html',
  styleUrls: ['./card-alumnos.component.css']
})
export class CardAlumnosComponent implements OnInit {
  listaAlumnos:any=[]
  idGrado:any
  isCorrectCodigo:boolean=false
  codigoError:string=''
  alumnoPropiedadesCrear:any={
    idTutor:'1',
    idRol:'4',
    activo:'1',
    ver_notas:'1',
    imagen:'assets/img/blank_profile.png',
  }
  constructor(private alumnosGradoService:GradosAlumnosService,private activedRoute:ActivatedRoute, private codigoService:CodigosService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['id']!=null){
      this.idGrado=params['id']
    }
    this.getAlumnos()
    console.log(this.idGrado)
  }
  getAlumnos(){
    this.alumnosGradoService.getAlmunosGrado(this.idGrado).subscribe(
      res=>{
        this.listaAlumnos=res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }
  verificaraCodigo(codigo:string){
    var dataCodigoAlumno:any={
      idTipoCodigo:'4',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoAlumno).subscribe(
      res=>{
        if(res==false){
          this.codigoError='border-danger'
        }else{
          this.isCorrectCodigo=true;
          this.alumnoPropiedadesCrear.idCodigo=res[0].idCodigo
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
}
