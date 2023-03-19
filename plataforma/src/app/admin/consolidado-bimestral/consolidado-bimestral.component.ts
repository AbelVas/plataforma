import { Component,OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { CuadroGuiaService } from "../services/cuadro-guia.service";

@Component({
  selector: 'app-consolidado-bimestral',
  templateUrl: './consolidado-bimestral.component.html',
  styleUrls: ['./consolidado-bimestral.component.css']
})
export class ConsolidadoBimestralComponent implements OnInit {
  errorLogininputs='form-select'
  idGrado:any;
  idCurso:any;
  idProfesor:any;
  GradoSeccion:any=[{}];
  alumnosGrado:any=[]
  CantidadAlumnos:any;
  Actividades:any=[]
  CantidadActividades:any='';
  tabla:any=[{}];
  equisde:any=[]
  bimestreSeleccionado:string='SELECCIONE PARA ACTUALIZAR';
  buscarBimestre=this.formBuilder.group({
    bimestre:new FormControl('',[Validators.required]),
  })
  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute, private cuadroGuia:CuadroGuiaService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
      this.idCurso=params['idCurso']
      this.idProfesor=params['idProfesor']
    }
    this.obtenerGradoSeccion()
  }

  consolidadoBuscar(){
    if (this.buscarBimestre.invalid) {
      this.errorLogininputs='form-select border-danger';
      return;
    }
    var loginData:any={}
    loginData=Object.assign(this.buscarBimestre.value)
    if(loginData.bimestre==1){
      this.bimestreSeleccionado="Primer Bimestre"
    }else if(loginData.bimestre==2){
      this.bimestreSeleccionado="Segundo Bimestre"
    }else if(loginData.bimestre==3){
      this.bimestreSeleccionado="Tercer Bimestre"
    }else if(loginData.bimestre==4){
      this.bimestreSeleccionado="Cuarto Bimestre"
    }
    this.obtenerActividadesCurso(loginData.bimestre)
    this.obtenerAlumnosGrado();
  }
  obtenerAlumnosGrado(){
    this.cuadroGuia.getAlumnosGradoCuadroGuia(this.idGrado).subscribe(
      res=>{
        this.alumnosGrado=res
        this.CantidadAlumnos=this.alumnosGrado.length
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerGradoSeccion(){
    this.cuadroGuia.getCursosNotasGradoGuia(this.idGrado,this.idCurso).subscribe(
      res=>{
        this.GradoSeccion=res
      },
      err=>{
        console.log(err)
      }
    )
  }

  obtenerActividadesCurso(idUnidad:any){
    var contador=0;
    var unidad=idUnidad;
    this.cuadroGuia.getActividadesCurso(this.idCurso,unidad).subscribe(
      res=>{
        this.Actividades=res
        this.CantidadActividades=this.Actividades.length
            this.cuadroGuia.getNotasFinal(this.idCurso,unidad,this.idGrado).subscribe(
              respuesta=>{
                this.tabla=respuesta
              },
              err=>{
                console.log(err)
              }
            )
      },
      err=>{
        console.log(err)
      }
    )
  }
  get f() { return this.buscarBimestre.controls; }
}
