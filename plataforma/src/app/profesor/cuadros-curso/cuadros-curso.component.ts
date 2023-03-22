import { Component,ElementRef,OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl,Validators } from "@angular/forms";
import { CardResumenService } from "../services/card-resumen.service";
import { TemaProfesorService } from "../services/tema-profesor.service";

@Component({
  selector: 'app-cuadros-curso',
  templateUrl: './cuadros-curso.component.html',
  styleUrls: ['./cuadros-curso.component.css']
})
export class CuadrosCursoComponent implements OnInit {

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

  errorLogininputs='form-select'
  docenteCurso:any=[]
  idGrado:any;
  idCurso:any;
  idProfesor:any;
  GradoSeccion:any=[{}];
  alumnosGrado:any=[]
  CantidadAlumnos:any;
  Actividades:any=[]
  CantidadActividades:any='';
  tabla:any=[{}];
  table:any=[];
  tablebody:any=[];
  equisde:any=[]

  cursosGet:any=[];
  cursosIndividual:any={
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nombre_curso:'',
    abreviatura:'',
    color_curso:''
  };
  idClase:string='';

  bimestreSeleccionado:string='SELECCIONE PARA ACTUALIZAR';
  buscarBimestre=this.formBuilder.group({
    bimestre:new FormControl('',[Validators.required]),
  })

  constructor(private formBuilder:FormBuilder,private activedRoute:ActivatedRoute, private cuadroGuia:CardResumenService, private temaProfesorService:TemaProfesorService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
      this.idCurso=params['idCurso']
      this.idProfesor=params['idProfesor']
    }this.cursoDocente()
    this.obtenerGradoSeccion()
    this.obtenerDatosCursos();
    this.cursosGet=this.cursosIndividual;

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
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

  obtenerDatosCursos(idCurso=this.idCurso){
    this.cuadroGuia.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
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
    this.cuadroGuia.obtenerGradoSeccion(this.idGrado).subscribe(
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
  cursoDocente(){
    this.cuadroGuia.cursoDocente(this.idCurso).subscribe(
      res=>{
        this.docenteCurso=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  get f() { return this.buscarBimestre.controls; }


  PrintThis(){
    //this.table.innerHTML=document.getElementById('#areaImprimir');
    //this.tablebody=document.body.innerHTML;
    //document.body.innerHTML=this.table;
    window.print();

    //document.body.innerHTML=this.tablebody;

  }

}
