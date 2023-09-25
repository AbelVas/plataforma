import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { BoletaEspecialService } from '../services/boleta-especial.service';

@Component({
  selector: 'app-boleta-especial',
  templateUrl: './boleta-especial.component.html',
  styleUrls: ['./boleta-especial.component.css']
})
export class BoletaEspecialComponent implements OnInit {
  idGrado:any
  idAlumno:any
  GradoSeccion:any=[{}];
  datoAlumno:any=[]
  notas:any=[]
  CantidadCursos:any
  PromedioBimestral:any=[]
  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private boletasEspecialService:BoletaEspecialService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
      this.idAlumno=params['idAlumno']
    }
    this.getAlumnoGradoSeccion(this.idGrado,this.idAlumno)
    this.consolidadoBuscar()
  }
  consolidadoBuscar(){
    this.boletasEspecialService.getCuerpoBoletaEspecial(this.idGrado,this.idAlumno).subscribe(
      res=>{
        this.notas=res
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }
  getAlumnoGradoSeccion(idGrado:any,idAlumno:any){
    this.boletasEspecialService.getAlumnoGrado(idGrado,idAlumno).subscribe(
      res=>{
        this.datoAlumno=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  PrintThis(){

    window.print();

  }
}
