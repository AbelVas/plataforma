import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActividadesOpcionesCursoService } from '../cursos-profesor/components/opciones-curso/services/actividades-opciones-curso.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividad-curso-profesor',
  templateUrl: './actividad-curso-profesor.component.html',
  styleUrls: ['./actividad-curso-profesor.component.css']
})
export class ActividadCursoProfesorComponent implements OnInit {

  idGrado:string='';
  idDetalleActividad1:string=''
  listaActividades:any=[]
  tiposActividad:any=[]
  listaCursosDocente:any=[]
  cursosCopiar:any=[]
  unidadesModal:any=[];
  idActividad:string='';
  idProfesor:string='';
  idCursoDocente:any={};
  listaAlumnos:any=[]
  listaCalificacionAlumno:any=[]
  //Crear Actividad
  propiedadActividad:any={
    idTipoActividad:'',
    nombre_actividad:'',
    detalle:'',
    cotejo:'',
    fecha_entrega:'',
    valor:'',
    recurso:'',
    ruta_acceso:'',
    creada:'',
    disponible:'1',
    entrega_fuera_fecha:'1',
    idCurso:'',
    idUnidad:'',
    idDetalleActividad:''
  }
  ActividadIndividual:any={
    idTipoActividad:'',
    nombre_actividad:'',
    detalle:'',
    cotejo:'',
    fecha_entrega:'',
    valor:'',
    recurso:'',
    ruta_acceso:'',
    creada:'',
    disponible:'',
    entrega_fuera_fecha:'',
    idCurso:'',
    idUnidad:'',
    idDetalleActividad:''
  }
  ActividadIndividualEdit:any={
    idTipoActividad:'',
    nombre_actividad:'',
    detalle:'',
    cotejo:'',
    fecha_entrega:'',
    valor:'',
    recurso:'',
    ruta_acceso:'',
    creada:'',
    disponible:'',
    entrega_fuera_fecha:'',
    idCurso:'',
    idUnidad:'',
    idDetalleActividad:''
  }

  idClase:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nombre_curso:'',
    abreviatura:''
  };

  datosCalificar:any={}
  @Input() idCurso:any=''
  //Grupo de aca, sirve para luego cerrar los modales si se obtiene un true desde la api
  @ViewChild('eliminarTareaModalCerrar') modalCloseEliminar: any;
  @ViewChild('editarActividadCerrar') modalCloseEditar: any;

  //Formulario
  crearTareaForm=this.formBuilder.group({
    idUnidad:new FormControl('',[Validators.required]),
    nombre_actividad:new FormControl('',[Validators.required]),
    fecha_entrega:new FormControl('',[Validators.required]),
    valor:new FormControl('',[Validators.required]),
    detalle:new FormControl(''),
    cotejo:new FormControl(''),
  })

  tareaCreadaObj:any=[];
  submitted=false;
  //fecha para hoy
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()

  constructor( private actividadesOpcionesCursoService:ActividadesOpcionesCursoService, private activedRoute:ActivatedRoute, private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idProfesor=params['idProfesor'];
    this.idGrado=params['idGrado'];
    this.idCurso=params['idCurso'];
    this.idClase=params['idCurso'];
    this.idDetalleActividad1=params['idActividad'];
    console.log('idActividad: '+this.idDetalleActividad1);
    this.getTipoActividad()
    this.getUnidadesActivas()
    this.getTareas()
    this.getCursosDocente()
    this.getAlumnos();
    this.obtenerDatosCursos();
  }

  obtenerDatosCursos(idCurso=this.idClase){
    this.actividadesOpcionesCursoService.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  validarCalificacionRefresh(idActividad:string,idUnidad:string){
    this.getAlumnoCalificacionActividad(idActividad,idUnidad);
  }
  calificarActividad(Calificacaion:any,idActividad:string,idAlumno:string){
    const elemto=Calificacaion.currentTarget as HTMLInputElement //para acceder al valor de los select en el HTML
    const value=elemto.value
    if(value!=''){
      var nota:any={
        idAlumno:idAlumno,
        calificacion:value
      }
      this.actividadesOpcionesCursoService.calificarActividad(idActividad,nota).subscribe(
        res=>{

        },
        err=>{
          console.log(err)
        }
      )
    }
  }
  getAlumnoCalificacionActividad(idActividad:string,idUnidad:string){
    this.datosCalificar.idDetalleActividad=idActividad
    this.datosCalificar.idUnidad=idUnidad
    this.actividadesOpcionesCursoService.getAlumnoCalificacionActividad(this.idCurso,this.datosCalificar).subscribe(
      res=>{
        this.listaCalificacionAlumno=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  getAlumnos(){
    this.actividadesOpcionesCursoService.getAlmunosGrado(this.idGrado).subscribe(
      res=>{
        this.listaAlumnos=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  arregloCursosaCopiar(event:Event){
    const elemto=event.currentTarget as HTMLInputElement //para acceder al valor de los select en el HTML
    const value=elemto.value
    const isCheked=elemto.checked

    if(isCheked==true){
      var existe=this.cursosCopiar.indexOf(value)
      if(existe=='-1'){
        this.cursosCopiar.push(value)
      }
    }else{
      this.cursosCopiar=this.cursosCopiar.filter((i: string)=>i!==value)
    }
  }

  getTareas(){
    this.actividadesOpcionesCursoService.getTareasCurso(this.idCurso).subscribe(
      res=>{
        this.listaActividades=res
        console.log(this.idCurso)
      },
      err=>{
        console.log(err)
      }
    )
  }

  buscarActividadArray(idActividad:string){
    this.ActividadIndividual=this.listaActividades.find((x:any)=>x.idDetalleActividad===idActividad)
    this.ActividadIndividualEdit=this.listaActividades.find((x:any)=>x.idDetalleActividad===idActividad)
  }
  editarActividad(idActividad:string){
    //eliminamos lo que no sirve del arreglo, dejamos solo los datos que necesita la tabla tbDetalleActividades
    delete this.ActividadIndividualEdit.unidad
    delete this.ActividadIndividualEdit.idDetalleActividad
    delete this.ActividadIndividualEdit.tipoActividad
    delete this.ActividadIndividualEdit.creada
    this.ActividadIndividualEdit.ultima_modificacion=this.fecha

    //delete this.ActividadIndividualEdit.disponible
    //delete this.ActividadIndividualEdit.entrega_fuera_fecha
    console.log(this.ActividadIndividualEdit);

    this.actividadesOpcionesCursoService.updateActividad(idActividad,this.ActividadIndividualEdit).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getTareas()
      },
      err=>{
        console.log(err)
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }
  eliminarActividad(idActividad:string){
    this.actividadesOpcionesCursoService.deleteTarea(idActividad).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas();
      },
      err=>{
        console.log(err)
      }
    )
  }
  getCursosDocente(){
    this.idCursoDocente.idCurso=this.idCurso
    this.actividadesOpcionesCursoService.getCursosProfesor(this.idProfesor,this.idCursoDocente).subscribe(
      res=>{
        this.listaCursosDocente=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getUnidadesActivas(){
    this.actividadesOpcionesCursoService.getUnidadesActivas().subscribe(
      res=>{
        this.unidadesModal=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getTipoActividad(){
    this.actividadesOpcionesCursoService.getTiposActividad().subscribe(
      res=>{
        this.tiposActividad=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  selectedCheckDisponible(e:any){
    if(e.target.checked){
      return this.propiedadActividad.disponible='1';
    }else{
      return this.propiedadActividad.disponible='0';
    }
  }
  noselectedCheckDisponible(e:any){
    if(e.target.checked==false){
      return this.propiedadActividad.disponible='0';
    }else{
      return this.propiedadActividad.disponible='1';
    }
  }
  selectedCheckFueraFecha(e:any){
    if(e.target.checked){
      return this.propiedadActividad.entrega_fuera_fecha='1';
    }else{
      return this.propiedadActividad.entrega_fuera_fecha='0';
    }
  }
  noselectedCheckFueraFecha(e:any){
    if(e.target.checked==false){
      return this.propiedadActividad.entrega_fuera_fecha='0';
    }else{
      return this.propiedadActividad.entrega_fuera_fecha='1';
    }
  }
  //logica Check para editar
  selectedCheckDisponibleEditar(e:any){
    if(e.target.checked){
      return this.ActividadIndividualEdit.disponible='1';
    }else{
      return this.ActividadIndividualEdit.disponible='0';
    }
  }
  noselectedCheckDisponibleEditar(e:any){
    if(e.target.checked==false){
      return this.ActividadIndividualEdit.disponible='0';
    }else{
      return this.ActividadIndividualEdit.disponible='1';
    }
  }
  selectedCheckFueraFechaEditar(e:any){
    if(e.target.checked){
      return this.ActividadIndividualEdit.entrega_fuera_fecha='1';
    }else{
      return this.ActividadIndividualEdit.entrega_fuera_fecha='0';
    }
  }
  noselectedCheckFueraFechaEditar(e:any){
    if(e.target.checked==false){
      return this.ActividadIndividualEdit.entrega_fuera_fecha='0';
    }else{
      return this.ActividadIndividualEdit.entrega_fuera_fecha='1';
    }
  }
  //para los forms siempre debemos traer los validadores
  get f() { return this.crearTareaForm.controls; }

}
