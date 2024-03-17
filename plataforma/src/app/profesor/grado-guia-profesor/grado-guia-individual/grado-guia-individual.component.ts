import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { GradoGuiaProfesorService } from '../../services/grado-guia-profesor.service';
import { TemaProfesorService } from '../../services/tema-profesor.service';
import { CuadroFinalService } from '../../../admin/services/cuadro-final.service';
import { CuadroGuiaService } from "../../../admin/services/cuadro-guia.service";
import { FormBuilder, FormControl,Validators } from "@angular/forms";

@Component({
  selector: 'app-grado-guia-individual',
  templateUrl: './grado-guia-individual.component.html',
  styleUrls: ['./grado-guia-individual.component.css']
})
export class GradoGuiaIndividualComponent implements OnInit {

  idProfesor:string='';
  Nombre_profesor:string='';
  Apellido_profesor:string='';

  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }


  buscarBimestre=this.formBuilder.group({
    bimestre:new FormControl('',[Validators.required]),
  })
  errorLogininputs='form-select'

  cursos:any=[]
  CantidadCursos:any='';
  tabla:any=[{}];
  tabla2:any=[{}];
  bimestreSeleccionado:string='SELECCIONE PARA ACTUALIZAR';

  gradosGet:any=[];
  gradosIndividual:any={
    nombre_grado:''
  };

  GradoSeccion:any=[{}];

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
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  ctexto1:string='';

  constructor(private cuadroGuia:CuadroGuiaService,private formBuilder:FormBuilder,private cuadroFinal:CuadroFinalService,private gradoGuiaProfesorService:GradoGuiaProfesorService, private activedRoute:ActivatedRoute, private temaProfesorService:TemaProfesorService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario,nombre_profesor,apellido_profesor}:any=decode(token);
    this.idProfesor=idUsuario;
    this.Nombre_profesor=nombre_profesor;
    this.Apellido_profesor=apellido_profesor

    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.obtenerAlumnosCursos();
    this.obtenerGrado();
    this.obtenerGradoSeccion(this.idGradoCurso)
    this.alumnosGet=this.alumnosIndividual

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet

    this.obtenerNotasCursos();
    this.obtenerCursosGrado()
  }

  obtenerGrado(idGradoAl=this.idGradoCurso){
    this.gradoGuiaProfesorService.getGrado(idGradoAl).subscribe(
      response=>{
        this.gradosGet=response;
      }
    )
  }

  obtenerCursosGrado(){
    this.cuadroFinal.obtenerCursosGradoFinal(this.idGradoCurso).subscribe(
      res=>{
       this.cursos=res
       this.CantidadCursos=this.cursos.length
      },
      err=>{
        console.log(err)
      }
    )
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.gradoGuiaProfesorService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
      }
    )
  }

  obtenerNotasCursos(){
    var idGrado=this.idGradoCurso
    this.cuadroFinal.obtenerNotasCuadroFinal(idGrado).subscribe(
      res=>{
        this.tabla=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  //consolidado bimestral
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
    this.obtenerAlumnosCursos();
    this.obtenerNotasCursos2(loginData.bimestre)
  }

  obtenerNotasCursos2(idUnidad:any){
    var unidad=idUnidad
    this.cuadroGuia.obtenerNotasCuadroGuia(this.idGradoCurso,unidad).subscribe(
      res=>{
        this.tabla2=res
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

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
