import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActividadService } from '../services/actividad.service';
import { UnidadesService } from 'src/app/admin/configuraciones/config-basicas/services/unidades.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GradosAlumnosService } from '../../../components/services/grados-alumnos.service';

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
  tareaCreadaObj:any=[];
  submitted=false;
  //fecha para hoy
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()

  constructor(private actividadService:ActividadService,private unidadService:UnidadesService,private formBuilder:FormBuilder,private activedRoute:ActivatedRoute,private alumnosService:GradosAlumnosService) { }
  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idProfesor=params['idProfesor'];
    this.idGrado=params['idGrado'];
    this.getTipoActividad()
    this.getUnidadesActivas()
    this.getTareas()
    this.getCursosDocente()
    this.getAlumnos();
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
        this.alertaValor.mensajeAlerta='Actividad Duplicada Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
      },
      err=>{
        this.modalCloseDuplicar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Duplicar Actividad'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
        this.cerrarAlerta()
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
    this.ActividadIndividualEdit.ultima_modificacion=this.fecha
    this.actividadService.updateActividad(idActividad,this.ActividadIndividualEdit).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getTareas()
        this.alertaValor.mensajeAlerta='Actividad Editada Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
      },
      err=>{
        this.modalCloseEditar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al EDITAR Actividad'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
        this.cerrarAlerta()
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
          this.alertaValor.mensajeAlerta='Actividad Eliminada Correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
      },
      err=>{
          this.modalCloseEliminar.nativeElement.click();
          this.alertaValor.mensajeAlerta='Error al Eliminar Actividad'
          this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-xmark'
          this.cerrarAlerta()
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
          this.alertaValor.mensajeAlerta='Foro Creada Correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
      },
      err=>{
          this.modalCloseForo.nativeElement.click();
          this.alertaValor.mensajeAlerta='Error al Crear Foro'
          this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-xmark'
          this.cerrarAlerta()
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
          this.alertaValor.mensajeAlerta='Tarea Creada Correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
        },
        err=>{
          this.modalCloseCrear.nativeElement.click();
          this.alertaValor.mensajeAlerta='Error al Crear Tarea'
          this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-xmark'
          this.cerrarAlerta()
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
  cerrarAlerta(){
    this.intervalo=setInterval(() => {//
      this.closeAlert.nativeElement.click();
      this.alertaValor.classAlerta='toast hide'
    }, 5000);
  }
  //para los forms siempre debemos traer los validadores
  get f() { return this.crearTareaForm.controls; }
}
