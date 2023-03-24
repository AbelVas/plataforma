import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { BoletasService } from '../services/boletas.service';
@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.component.html',
  styleUrls: ['./boletas.component.css']
})
export class BoletasComponent implements OnInit {
  idGrado:any
  idAlumno:any
  GradoSeccion:any=[{}];
  datoAlumno:any=[]
  notas:any=[]
  CantidadCursos:any
  PromedioBimestral:any=[]
  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private boletasService:BoletasService) { }

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
    var suma1:number=0
    var suma2:number=0
    var suma3:number=0
    var suma4:number=0
    var suma5:number=0
    var promedio1:number=0
    var promedio2:number=0
    var promedio3:number=0
    var promedio4:number=0
    var promedio5:number=0
    this.boletasService.getCuerpoBoleta(this.idGrado,this.idAlumno).subscribe(
      res=>{
        this.notas=res
        this.CantidadCursos=this.notas.length
        for(let i=0;i<this.CantidadCursos;i++){
          suma1=suma1+this.notas[i].uno
          suma2=suma2+this.notas[i].dos
          suma3=suma3+this.notas[i].tres
          suma4=suma4+this.notas[i].cuatro
          suma5=suma5+this.notas[i].promedio
        }
        promedio1=Math.round(suma1/this.CantidadCursos)
        promedio2=Math.round(suma2/this.CantidadCursos)
        promedio3=Math.round(suma3/this.CantidadCursos)
        promedio4=Math.round(suma4/this.CantidadCursos)
        promedio5=Math.round(suma5/this.CantidadCursos)
        this.PromedioBimestral=[promedio1,promedio2,promedio3,promedio4,promedio5]
      },
      err=>{
        console.log(err)
      }
    )
  }
  getAlumnoGradoSeccion(idGrado:any,idAlumno:any){
    this.boletasService.getAlumnoGrado(idGrado,idAlumno).subscribe(
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
