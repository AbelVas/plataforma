import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActividadService } from '../../../../services/actividad.service';
import { UnidadesService } from 'src/app/admin/services/unidades.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GradosAlumnosService } from '../../../../services/grados-alumnos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-actividades-admin',
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit {
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
  listaRecursoCurso:any=[]
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
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  alertaValorCalificar:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  datosCalificar:any={}
  sppinerOn:boolean=true;
  intervalo:any
  @Input() idCurso:any=''
  //Grupo de aca, sirve para luego cerrar los modales si se obtiene un true desde la api
  @ViewChild('crearTareaModalCerrar') modalCloseCrear: any;
  @ViewChild('eliminarTareaModalCerrar') modalCloseEliminar: any;
  @ViewChild('crearForoModalCerrar') modalCloseForo: any;
  @ViewChild('editarActividadCerrar') modalCloseEditar: any;
  @ViewChild('duplicarActividadCerrar') modalCloseDuplicar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  @ViewChild('CalificarModal') modalCloseClificar: any;
  //Formulario
    crearTareaForm=this.formBuilder.group({
    idUnidad:new FormControl('',[Validators.required]),
    nombre_actividad:new FormControl('',[Validators.required]),
    fecha_entrega:new FormControl('',[Validators.required]),
    valor:new FormControl('',[Validators.required]),
    detalle:new FormControl(''),
    cotejo:new FormControl(''),
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

  constructor(private actividadService:ActividadService,private unidadService:UnidadesService,private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private alumnosService:GradosAlumnosService,private toastrService:ToastrService) { }
  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idProfesor=params['idProfesor'];
    this.idGrado=params['idGrado'];
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
      this.actividadService.calificarActividad(idActividad,nota).subscribe(
        res=>{
          //this.modalCloseClificar.nativeElement.click();

        },
        err=>{
          //this.modalCloseClificar.nativeElement.click();

        }
      )
    }
  }
  getAlumnoCalificacionActividad(idActividad:string,idUnidad:string){
    this.datosCalificar.idDetalleActividad=idActividad
    this.datosCalificar.idUnidad=idUnidad
    this.actividadService.getAlumnoCalificacionActividad(this.idCurso,this.datosCalificar).subscribe(
      res=>{
        this.listaCalificacionAlumno=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  getAlumnos(){
    this.alumnosService.getAlmunosGrado(this.idGrado).subscribe(
      res=>{
        this.listaAlumnos=res
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;

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
    this.actividadService.duplicarTarea(idActividad,idCursosFinal).subscribe(
      res=>{
        this.modalCloseDuplicar.nativeElement.click();
        this.getCursosDocente()
        this.getTareas()
        this.cursosCopiar=[]
        this.toastrService.success(`Actividad Duplicada`,'Realizado')
      },
      err=>{
        this.modalCloseDuplicar.nativeElement.click();
        this.toastrService.error(`Actividad no Duplicada`,'Error')
      }
    )
  }
  getTareas(){
    this.actividadService.getTareasCurso(this.idCurso).subscribe(
      res=>{
        this.listaActividades=res
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
    delete this.ActividadIndividual.color_curso
    this.ActividadIndividualEdit.ultima_modificacion=this.fecha
    this.actividadService.updateActividad(idActividad,this.ActividadIndividualEdit).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getTareas()
        this.toastrService.success(`Actividad Editada`,'Realizado')
      },
      err=>{
        this.modalCloseEditar.nativeElement.click();
        this.toastrService.error(`Actividad no Editada`,'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }
  eliminarActividad(idActividad:string){
    this.actividadService.deleteTarea(idActividad).subscribe(
      res=>{
          this.modalCloseEliminar.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas();
          this.toastrService.success(`Actividad Eliminada`,'Realizado')
      },
      err=>{
          this.modalCloseEliminar.nativeElement.click();
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
    this.actividadService.crearTarea(this.tareaCreadaObj).subscribe(
      res=>{
          this.modalCloseForo.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas()
          this.toastrService.success(`Foro Creado`,'Realizado')
      },
      err=>{
          this.modalCloseForo.nativeElement.click();
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
      this.actividadService.crearTarea(this.tareaCreadaObj).subscribe(
        res=>{
          this.modalCloseCrear.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas()
          this.modalCloseCrear.nativeElement.click();
          this.toastrService.success(`Tarea Creada`,'Realizado')
        },
        err=>{
          this.modalCloseCrear.nativeElement.click();
          this.toastrService.error(`Tarea no Creada`,'Error')
        }
      )
  }
  getCursosDocente(){
    this.idCursoDocente.idCurso=this.idCurso
    this.actividadService.getCursosProfesor(this.idProfesor,this.idCursoDocente).subscribe(
      res=>{
        this.listaCursosDocente=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getUnidadesActivas(){
    this.unidadService.getUnidadesActivas().subscribe(
      res=>{
        this.unidadesModal=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getTipoActividad(){
    this.actividadService.getTiposActividad().subscribe(
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

  //Aquí empieza lo de los recursos web
  getRecursosPorGrado(){
    this.actividadService.getRecursosCurso(this.idCurso).subscribe(
      res=>{
        this.listaRecursoCurso=res;
        console.log(this.listaRecursoCurso)
      },
      err=>{
        console.log(err)
      }
    )
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
      this.actividadService.crearRecurso(this.tareaCreadaObj).subscribe(
        res=>{
          this.modalCloseCrear.nativeElement.click();
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
