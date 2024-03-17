import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActividadesOpcionesCursoService } from 'src/app/profesor/services/actividades-opciones-curso.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-opciones-curso',
  templateUrl: './opciones-curso.component.html',
  styleUrls: ['./opciones-curso.component.css']
})
export class OpcionesCursoComponent implements OnInit {

  // CKEDITOR
  public AreaCkeditor = ClassicEditor;
  AnuncioCkeditor:any='';
  RecursoCkeditor:any='';
  TCotejoCkeditor:any='';
  TDescripcionCkEditor: any = '';
  // CKEDITOR

  listaRecursoCurso:any=[]

  RecursoIndividual:any={
    idtbRecursoVideo:'',
    titulo:'',
    descripcion:'',
    fecha_creacion:'',
    idCurso:'',
    idUnidad:'',
    enlace:'',
    unidad:''
  }
  RecursoIndividualEdit:any={
    idtbRecursoVideo:'',
    titulo:'',
    descripcion:'',
    fecha_creacion:'',
    idCurso:'',
    idUnidad:'',
    enlace:'',
    unidad:''
  }


  value: string='';
  sppinerOn:boolean=true;
  idGrado:string=''
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
  listaAnuncioCurso:any=[]
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
  datosCalificar:any={}
  @Input() idCurso:any=''
  //Grupo de aca, sirve para luego cerrar los modales si se obtiene un true desde la api
  @ViewChild('crearTareaModalCerrar') modalCloseCrear: any;
  @ViewChild('crearRecursoCerrar') modalRecursoCloseCrear: any;
  @ViewChild('eliminarTareaModalCerrar') modalCloseEliminar: any;
  @ViewChild('modalCloseEliminarRecurso') modalCloseEliminarRecurso:any;
  @ViewChild('crearForoModalCerrar') modalCloseForo: any;
  @ViewChild('editarActividadCerrar') modalCloseEditar: any;
  @ViewChild('editarRecursoCerrar') modalRecursoCloseEditar: any;
  @ViewChild('duplicarActividadCerrar') modalCloseDuplicar: any;

  //Formulario tareas
    crearTareaForm=this.formBuilder.group({
    idUnidad:new FormControl('',[Validators.required]),
    nombre_actividad:new FormControl('',[Validators.required]),
    fecha_entrega:new FormControl('',[Validators.required]),
    valor:new FormControl('',[Validators.required]),
    detalle:new FormControl(''),
    cotejo:new FormControl(''),
    ultima_modificacion:new FormControl(''),
    entrega_fuera_fecha: new FormControl(''),
    disponible: new FormControl('')
  })
  //Formulario recurosweb
  crearRecursoForm=this.formBuilder.group({
    idUnidad:new FormControl('',[Validators.required]),
    titulo:new FormControl('',[Validators.required]),
    enlace:new FormControl('',[Validators.required]),
    descripcion:new FormControl(''),
  })

  tareaCreadaObj:any=[];
  submitted=false;
  //fecha para hoy
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  constructor( private actividadesOpcionesCursoService:ActividadesOpcionesCursoService, private activedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService ) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idProfesor=params['idProfesor'];
    this.idGrado=params['idGrado'];
    this.idCurso=params['idCurso'];
    this.getTipoActividad()
    this.getUnidadesActivas()
    this.getTareas()
    this.getCursosDocente()
    this.getAlumnos();
    this.getRecursosPorGrado()
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
          this.toastrService.success(`Calificaciones Guardadas`,'Realizado')

        },
        err=>{
          console.log(err)
          this.toastrService.error(`Calificaciones no Guardadas`,'Error')
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

  duplicarTareas(idActividad:string,event:Event){
    var idCursosFinal:any=[]
    for(let i=0;i<this.cursosCopiar.length;i++){
      idCursosFinal.push({idCurso:this.cursosCopiar[i]})
    }
    this.actividadesOpcionesCursoService.duplicarTarea(idActividad,idCursosFinal).subscribe(
      res=>{
        this.modalCloseDuplicar.nativeElement.click();
        this.getCursosDocente()
        this.getTareas()
        this.cursosCopiar=[]
        this.toastrService.success(`Actividad Duplicada`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Actividad no Duplicada`,'Error')
      }
    )
  }
  getTareas(){
    this.actividadesOpcionesCursoService.getTareasCurso(this.idCurso).subscribe(
      res=>{
        this.sppinerOn=false;
        this.listaActividades=res
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  buscarActividadArray(idActividad:string){
    this.ActividadIndividual=this.listaActividades.find((x:any)=>x.idDetalleActividad===idActividad)
    this.ActividadIndividualEdit=this.listaActividades.find((x:any)=>x.idDetalleActividad===idActividad)
  }

  get f() { return this.crearTareaForm.controls; }

  editarActividad(idActividad:string){
    this.submitted=true;
    if (this.crearTareaForm.invalid) {
      this.toastrService.error(`Completar información restante`,'Error')
      return;
    }
    this.crearTareaForm.value.disponible= this.propiedadActividad.disponible;
    this.crearTareaForm.value.entrega_fuera_fecha= this.propiedadActividad.entrega_fuera_fecha;
    this.crearTareaForm.value.ultima_modificacion=this.fecha;
    this.actividadesOpcionesCursoService.updateActividad(idActividad,this.crearTareaForm.value).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getTareas()
        this.toastrService.success(`Actividad Editada`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Actividad no Editada`,'Error')
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
          this.toastrService.success(`Actividad Eliminada`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Actividad no Eliminada`,'Error')
      }
    )
  }
  crearForo(){
    this.submitted=true;
    if (this.crearTareaForm.invalid) {
      return;
    }
    this.tareaCreadaObj=this.crearTareaForm.value
    this.tareaCreadaObj.idCurso=this.idCurso
    this.tareaCreadaObj.idTipoActividad='2'
    this.tareaCreadaObj.creada=this.fecha
    this.tareaCreadaObj.disponible='1'
    this.actividadesOpcionesCursoService.crearTarea(this.tareaCreadaObj).subscribe(
      res=>{
          this.modalCloseCrear.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas()
          this.toastrService.success(`Foro Creado`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Foro no Creado`,'Error')
      }
    )
  }
  crearTarea(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.crearTareaForm.invalid) {
            return;
        }
        // display form values on success
        this.tareaCreadaObj=this.crearTareaForm.value
        this.tareaCreadaObj.idCurso=this.idCurso
        this.tareaCreadaObj.idTipoActividad='1'
        this.tareaCreadaObj.creada=this.fecha
        this.tareaCreadaObj.disponible=this.propiedadActividad.disponible
        this.tareaCreadaObj.entrega_fuera_fecha=this.propiedadActividad.entrega_fuera_fecha
      this.actividadesOpcionesCursoService.crearTarea(this.tareaCreadaObj).subscribe(
        res=>{
          this.modalCloseCrear.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas()
          this.toastrService.success(`Tarea Creada`,'Realizado')
        },
        err=>{
          console.log(err)
          this.toastrService.error(`Tarea no Creada`,'Error')
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
      return this.propiedadActividad.disponible='1';
    }else{
      return this.propiedadActividad.disponible='0';
    }
  }
  noselectedCheckDisponibleEditar(e:any){
    if(e.target.checked==false){
      return this.propiedadActividad.disponible='0';
    }else{
      return this.propiedadActividad.disponible='1';
    }
  }
  selectedCheckFueraFechaEditar(e:any){
    if(e.target.checked){
      return this.propiedadActividad.entrega_fuera_fecha='1';
    }else{
      return this.propiedadActividad.entrega_fuera_fecha='0';
    }
  }
  noselectedCheckFueraFechaEditar(e:any){
    if(e.target.checked==false){
      return this.propiedadActividad.entrega_fuera_fecha='0';
    }else{
      return this.propiedadActividad.entrega_fuera_fecha='1';
    }
  }
  //para los forms siempre debemos traer los validadores
  get R() { return this.crearRecursoForm.controls; }

//Aquí empieza lo de los recursos web
  getRecursosPorGrado(){
    this.actividadesOpcionesCursoService.getRecursosCurso(this.idCurso).subscribe(
      res=>{
        this.listaRecursoCurso=res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  buscarActividadArrayRecursos(idtbRecursoVideo:string){
    this.RecursoIndividual=this.listaRecursoCurso.find((x:any)=>x.idtbRecursoVideo===idtbRecursoVideo)
    this.RecursoIndividualEdit=this.listaRecursoCurso.find((x:any)=>x.idtbRecursoVideo===idtbRecursoVideo)

  }

  eliminarRecurso(idtbRecursoVideo:string){
    this.actividadesOpcionesCursoService.deleteRecurso(idtbRecursoVideo).subscribe(
      res=>{
        this.modalCloseEliminarRecurso.nativeElement.click();
        this.submitted = false;
        this.crearRecursoForm.reset();
        this.getRecursosPorGrado();
        this.toastrService.success(`Recurso Eliminado`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Recurso no Eliminado`,'Error')
      }
    )
  }

  editarRecurso(idtbRecursoVideo:string){
    this.submitted=true;
    if (this.crearRecursoForm.invalid) {
      this.toastrService.error(`Completar informacion restante`,'Error')
      return;
    }
    this.actividadesOpcionesCursoService.updateRecurso(idtbRecursoVideo,this.crearRecursoForm.value).subscribe(
      res=>{
        this.modalRecursoCloseEditar.nativeElement.click();
        this.getRecursosPorGrado()
        this.toastrService.success(`Actividad Editada`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Actividad no Editada`,'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }

  crearRecurso(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.crearRecursoForm.invalid) {
            return;
        }
        // display form values on success
        this.tareaCreadaObj=this.crearRecursoForm.value
        this.tareaCreadaObj.idCurso=this.idCurso
        this.tareaCreadaObj.fecha_creacion=this.fecha
      this.actividadesOpcionesCursoService.crearRecurso(this.tareaCreadaObj).subscribe(
        res=>{
          this.modalRecursoCloseCrear.nativeElement.click();
          this.submitted = false;
          this.crearRecursoForm.reset();
          this.getRecursosPorGrado()
          this.toastrService.success(`Recurso Creado`,'Realizado')
        },
        err=>{
          console.log(err)
          this.toastrService.error(`Recurso no Creado`,'Error')
        }
      )
  }
}

