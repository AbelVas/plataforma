import { Component,OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { CuadroGuiaService } from "../services/cuadro-guia.service";

@Component({
  selector: 'app-cuadro-guia',
  templateUrl: './cuadro-guia.component.html',
  styleUrls: ['./cuadro-guia.component.css']
})
export class CuadroGuiaComponent implements OnInit {
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
  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private cuadroGuia:CuadroGuiaService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
    }
    this.obtenerGradoSeccion(this.idGrado)
    this.obtenerAlumnosGrado();
    this.obtenerCursosGrado();
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
    this.obtenerAlumnosGrado();
    this.obtenerNotasCursos(loginData.bimestre)
  }
  obtenerNotasCursos(idUnidad:any){
    var unidad=idUnidad
    this.cuadroGuia.obtenerNotasCuadroGuia(this.idGrado,unidad).subscribe(
      res=>{
        this.tabla=res
      },
      err=>{
        console.log(err)
      }
    )
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
  obtenerGradoSeccion(idGrado:any){
    this.cuadroGuia.obtenerGradoSeccion(idGrado).subscribe(
      res=>{
        this.GradoSeccion=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerCursosGrado(){
    this.cuadroGuia.obtenerCursosGrado(this.idGrado).subscribe(
      res=>{
       this.cursos=res
       this.CantidadCursos=this.cursos.length
      },
      err=>{
        console.log(err)
      }
    )
  }
}
