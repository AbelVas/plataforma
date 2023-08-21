import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { CuadroFinalService } from '../services/cuadro-final.service';

@Component({
  selector: 'app-cuadro-final',
  templateUrl: './cuadro-final.component.html',
  styleUrls: ['./cuadro-final.component.css']
})
export class CuadroFinalComponent implements OnInit {
  errorLogininputs='form-select'
  idGrado:any;
  GradoSeccion:any=[{}];
  alumnosGrado:any=[]
  CantidadAlumnos:any;
  cursos:any=[]
  CantidadCursos:any='';
  tabla:any=[{}];
  bimestreSeleccionado:string='SELECCIONE PARA ACTUALIZAR';
  buscarBimestre=this.formBuilder.group({
    bimestre:new FormControl('',[Validators.required]),
  })
  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private cuadroFinal:CuadroFinalService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
    }
    this.obtenerGradoSeccion(this.idGrado)
    this.obtenerAlumnosGrado();
    this.obtenerCursosGrado();
  }
  obtenerAlumnosGrado(){
    this.cuadroFinal.getAlumnosGradoCuadroGuia(this.idGrado).subscribe(
      res=>{
        this.alumnosGrado=res
        this.CantidadAlumnos=this.alumnosGrado.length
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerGradoSeccion(idGrado:any){
    this.cuadroFinal.obtenerGradoSeccion(idGrado).subscribe(
      res=>{
        this.GradoSeccion=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerCursosGrado(){
    this.cuadroFinal.obtenerCursosGrado(this.idGrado).subscribe(
      res=>{
       this.cursos=res
       this.CantidadCursos=this.cursos.length
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
