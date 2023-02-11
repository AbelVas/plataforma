import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from '../services/card-resumen.service';
import { TemaProfesorService } from '../services/tema-profesor.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.component.html',
  styleUrls: ['./cursos-profesor.component.css']
})
export class CursosProfesorComponent implements OnInit {

  idClase:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nombre_curso:'',
    abreviatura:'',
    color_curso:''
  };
  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

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

  intervalo:any
  cursoForm:any
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute, private temaProfesorService:TemaProfesorService, private router:Router, private formBuilder:FormBuilder, private toastrService:ToastrService ) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idClase=params['idCurso'];
    this.idGradoCurso=params['idGrado'];
    this.obtenerDatosCursos();
    this.obtenerAlumnosCursos();

    this.cursoForm=this.formBuilder.group({
      color_curso:new FormControl('',[Validators.required]),
    })

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosCursos(idCurso=this.idClase){
    this.cardResumenService.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
      }
    )

  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
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

  updateCurso(idCurso=this.idClase){
    var DataModificada:any={}
    if(this.f.color_curso.value!=''){
      DataModificada.color_curso=this.f.color_curso.value
    }
    if(Object.entries(DataModificada).length!=0){
      this.cardResumenService.updateCurso(idCurso,DataModificada).subscribe(
        res=>{
          this.obtenerDatosCursos()
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.success(`Curso Actualizado`,'Realizado')
        },
        err=>{
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.error(`Error al Actulizar`,'Error')
          console.log(err)
        }
      )
    }else{
      this.modalCloseEditar.nativeElement.click();
      //Aquí va el mensajito flotante de no se realizaron cambios
    }
  }

  get f() { return this.cursoForm.controls; }

}
