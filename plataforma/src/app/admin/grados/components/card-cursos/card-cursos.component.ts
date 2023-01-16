import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from 'src/app/admin/dashboard/components/services/profesores.service';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { CursosAlumnosGradosService } from '../services/cursos-alumnos-grados.service';

@Component({
  selector: 'app-card-cursos-grado-admin',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.css']
})
export class CardCursosComponent implements OnInit {
  idNivelSeleccionado:string=''
  cursoIndividual:any={}
  idGrado:string=''
  filterValue:string=''
  listaCursos:any=[]
  listaDocentes:any=[]
  dataTable: any;
  cursosPorPagina=15;
  dataSource:any=[]
  errorService:any={
    codigoError:''
  };
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  cusroPropiedadesCrear:any={
    idConfiguracionCurso:'1',
  }
  intervalo:any
  consolidadoBoletasINSERT:string='1'
  consolidadoFinalINSERT:string='1'
  consolidadoBimestralINSERT:string='1'
  cursoForm:any
  cursoFormChecks:any
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()
  submitted=false
  constructor(private profesoresService:ProfesoresService,private cursosAlumnosService:CursosAlumnosGradosService,private activedRoute:ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idNivelSeleccionado=params['data']
    }
    this.idGrado=params['id'];
    this.getDocentes()
    this.getCursos()
    this.cursoForm=this.formBuilder.group({
      idProfesor:new FormControl('',[Validators.required]),
      nombre_curso:new FormControl('',[Validators.required]),
      abreviatura:new FormControl('',[Validators.required]),
      boletas:new FormControl(''),
      consolidado_anual:new FormControl(''),
      consolidado_bimestre:new FormControl(''),
      color_curso:new FormControl('',[Validators.required]),
    })
  }
  printer() {
    const printContent:any = document.getElementById("print-section");
    const WindowPrt:any = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  getCursos(){
    this.cursosAlumnosService.getCursosGrado(this.idGrado).subscribe(
      res=>{
        this.listaCursos=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  eliminarCurso(idCurso:string){
    this.cursosAlumnosService.deleteCurso(idCurso).subscribe(
    res=>{
      this.getCursos()
      this.modalCloseEliminar.nativeElement.click();
      this.alertaValor.mensajeAlerta='Curso Eliminado Correctamente'
      this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
      this.alertaValor.icon='fa-solid fa-circle-check'
      this.cerrarAlerta()
    },
    err=>{
      this.modalCloseEliminar.nativeElement.click();
      this.alertaValor.mensajeAlerta='Error al Crear el Curso'
      this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
      this.alertaValor.icon='fa-solid fa-xmark'
      this.cerrarAlerta()
    })
  }
  crearCurso(){

    var cursoIngresado:any={}
    cursoIngresado.idConfiguracionCurso=this.cusroPropiedadesCrear.idConfiguracionCurso
    cursoIngresado.idProfesor=this.f.idProfesor.value
    cursoIngresado.nombre_curso=this.f.nombre_curso.value
    cursoIngresado.abreviatura=this.f.abreviatura.value
    cursoIngresado.consolidado_bimestre=this.consolidadoBimestralINSERT;
    cursoIngresado.consolidado_anual=this.consolidadoFinalINSERT;
    cursoIngresado.boletas=this.consolidadoBoletasINSERT;
    cursoIngresado.idGrado=this.idGrado
    cursoIngresado.creado=this.fecha
    cursoIngresado.color_curso=this.f.color_curso.value
    this.submitted = true;
    // stop here if form is invalid
    if (this.cursoForm.invalid) {
        return;
    }
    this.cursosAlumnosService.insertCursosGrado(cursoIngresado).subscribe(
      res=>{
        this.getCursos()
        this.modalCloseCrear.nativeElement.click();
        this.alertaValor.mensajeAlerta='Curso Creado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
        this.cursoForm.reset();
      },
      err=>{
        this.modalCloseCrear.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Crear el Curso'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
        this.cerrarAlerta()
      }
    )

  }
  editarCurso(idCurso:string){
    var DataModificada:any={}
    if(this.f.idProfesor.value!=''){
      DataModificada.idProfesor=this.f.idProfesor.value
    }
    if(this.f.nombre_curso.value!=''){
      DataModificada.nombre_curso=this.f.nombre_curso.value
    }
    if(this.f.abreviatura.value!=''){
      DataModificada.abreviatura=this.f.abreviatura.value
    }
    if(this.f.color_curso.value!=''){
      DataModificada.color_curso=this.f.color_curso.value
    }
    if(this.ch.boletas.value!=this.cursoIndividual.boletas){
      DataModificada.boletas=this.cursoIndividual.boletas
    }
    if(this.ch.consolidado_anual.value!=this.cursoIndividual.consolidado_anual){
      DataModificada.consolidado_anual=this.cursoIndividual.consolidado_anual
    }
    if(this.ch.consolidado_bimestre.value!=this.cursoIndividual.consolidado_bimestre){
      DataModificada.consolidado_bimestre=this.cursoIndividual.consolidado_bimestre
    }
    if(Object.entries(DataModificada).length!=0){
      this.cursosAlumnosService.updateCurso(idCurso,DataModificada).subscribe(
        res=>{
          this.getCursos()
          this.modalCloseEditar.nativeElement.click();
          this.alertaValor.mensajeAlerta='Curso Actualizado correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
        },
        err=>{
          this.modalCloseEditar.nativeElement.click();
          this.alertaValor.mensajeAlerta='Error al actualizar'
          this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-exclamation'
          this.cerrarAlerta()
        }
      )
    }else{
      this.modalCloseEditar.nativeElement.click();
      this.alertaValor.mensajeAlerta='No se Realizaron Cambios'
      this.alertaValor.classAlerta='bg-secondary bottom-0 end-0 position-absolute text-white toast show'
      this.alertaValor.icon='fa-solid fa-circle-exclamation'
      this.cerrarAlerta()
    }
  }
  getDocentes(){
    this.profesoresService.getProfesoresListaSelectCursos().subscribe(
      res=>{
        this.listaDocentes=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarCursoIndividual(idCurso:string){
    this.cursoIndividual=this.listaCursos.find((x:any)=>x.idCurso===idCurso)
    this.cursoFormChecks=this.formBuilder.group({
      boletas:new FormControl(this.cursoIndividual.boletas),
      consolidado_anual:new FormControl(this.cursoIndividual.consolidado_anual),
      consolidado_bimestre:new FormControl(this.cursoIndividual.consolidado_bimestre),
    })
  }
  selectedCheckCBimestral(e:any){
    if(e.target.checked){
      this.cursoIndividual.consolidado_bimestre='1'
      this.consolidadoBimestralINSERT='1'
      return this.consolidadoBimestralINSERT='1';
    }else{
      this.cursoIndividual.consolidado_bimestre='0'
      this.consolidadoBimestralINSERT='0'
      return this.consolidadoBimestralINSERT='0';
    }
  }
  noselectedCheckCBimestral(e:any){
    if(e.target.checked==false){
      this.consolidadoBimestralINSERT='0'
      this.cursoIndividual.consolidado_bimestre='0'
      return this.consolidadoBimestralINSERT='0';
    }else{
      this.cursoIndividual.consolidado_bimestre='1'
      this.consolidadoBimestralINSERT='1'
      return this.consolidadoBimestralINSERT='1';
    }
  }
  selectedCheckCFinal(e:any){
    if(e.target.checked){
      this.consolidadoFinalINSERT='1'
      this.cursoIndividual.consolidado_anual='1'
      return this.consolidadoFinalINSERT='1';
    }else{
      this.cursoIndividual.consolidado_anual='0'
      this.consolidadoFinalINSERT='0'
      return this.consolidadoFinalINSERT='0';
    }
  }
  noselectedCheckCFinal(e:any){
    if(e.target.checked==false){
      this.consolidadoFinalINSERT='0'
      this.cursoIndividual.consolidado_anual='0'
      return this.consolidadoFinalINSERT='0';
    }else{
      this.consolidadoFinalINSERT='1'
      this.cursoIndividual.consolidado_anual='1'
      return this.consolidadoFinalINSERT='1';
    }
  }
  selectedCheckBoletas(e:any){
    if(e.target.checked){
      this.consolidadoBoletasINSERT='1'
      this.cursoIndividual.boletas='1'
      return this.consolidadoBoletasINSERT='1';
    }else{
      this.cursoIndividual.boletas='0'
      this.consolidadoBoletasINSERT='0'
      return this.consolidadoBoletasINSERT='0';
    }
  }
  noselectedCheckBoletas(e:any){
    if(e.target.checked==false){
      this.consolidadoBoletasINSERT='0'
      this.cursoIndividual.boletas='0'
      return this.consolidadoBoletasINSERT='0';
    }else{
      this.consolidadoBoletasINSERT='1'
      this.cursoIndividual.boletas='1'
      return this.consolidadoBoletasINSERT='1';
    }
  }
  cerrarAlerta(){
    this.intervalo=setInterval(() => {//
      this.closeAlert.nativeElement.click();
      this.alertaValor.classAlerta='toast hide'
    }, 5000);
  }
  get f() { return this.cursoForm.controls; }
  get ch(){ return this.cursoFormChecks.controls;}
  }
