import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ProfesoresService } from '../../../services/profesores.service';
import { CodigosService } from '../../../services/codigos.service';

@Component({
  selector: 'app-docentes-resumen-admin-dashboard',
  templateUrl: './docentes-resumen.component.html',
  styleUrls: ['./docentes-resumen.component.css']
})
export class DocentesResumenComponent implements OnInit {
  sppinerOn:boolean=true;
  listaDocentes:any=[];
  docenteIndividual:any={}
  isEditPassword:string='0'
  variable:string='1'
  isCorrectCodigo:boolean=false
  codigoError:string=''
  passNoCoincide:string=''
  docentePropiedadesCrear:any={
    estatus:'1',
    cambio_contrasena:'0',
    imagen:'assets/img/blank_profile.png',
    permitir_ver_correo:'1',
    idRol:'2',
    idCodigo:''
  }
   //fecha para hoy
   hoy:any=new Date();
   mesActual=this.hoy.getMonth()+1;
   fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  @Output() alerta=new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataTable: any;
  dataSource:any;
  docentesPorPagina=5;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','docente','usuario','estado','acciones'];
  docenteForm=this.formBuilder.group({
    nombre_profesor:new FormControl('',[Validators.required]),
    apellido_profesor:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    CUI:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    fecha_nacimiento:new FormControl('',[Validators.required]),
    estatus:new FormControl(''),
    pass:new FormControl('',[Validators.required]),
    confirmPass:new FormControl('',[Validators.required])
  })
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  classAlerta:string=''
  mensajeAlerta:string=''
  icon=''
  intervalo:any
  submitted=false;
  constructor(private profesorService:ProfesoresService,private formBuilder:FormBuilder,private codigoService:CodigosService) { }

  ngOnInit(): void {
    this.getProfesores();
  }
  getProfesores(){
    this.profesorService.getProfesoresListaSelectCursos().subscribe(
      res=>{
        this.listaDocentes=res
        this.sppinerOn=false;
        this.dataSource = new MatTableDataSource(this.listaDocentes);
        this.paginator._intl.itemsPerPageLabel = 'Docentes por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  editarProfesor(idProfesor:string){
    this.submitted = true;
    if ((this.f.pass.value!=this.f.confirmPass.value)) {
      this.passNoCoincide='border-danger'
      return;
    }
    var DatoDocenteEditado:any={}
    if(this.f.nombre_profesor.value!=''){
      DatoDocenteEditado.nombre_profesor=this.f.nombre_profesor.value
    }
    if(this.f.apellido_profesor.value!=''){
      DatoDocenteEditado.apellido_profesor=this.f.apellido_profesor.value
    }
    if(this.f.fecha_nacimiento.value!=''){
      DatoDocenteEditado.fecha_nacimiento=this.f.fecha_nacimiento.value
    }
    if(this.f.telefono.value!=''){
      DatoDocenteEditado.telefono=this.f.telefono.value
    }
    if(this.f.CUI.value!=''){
      DatoDocenteEditado.CUI=this.f.CUI.value
    }
    if(this.f.usuario.value!=''){
      DatoDocenteEditado.usuario=this.f.usuario.value
    }
    if(this.f.pass.value!=''){
      DatoDocenteEditado.pass=this.f.pass.value
    }
    if(Object.entries(DatoDocenteEditado).length===0){
      this.modalCloseEditar.nativeElement.click();
      this.alertaValor.mensajeAlerta='No se editaron Datos'
      this.alertaValor.classAlerta='bg-secondary bottom-0 end-0 position-absolute text-white toast show'
      this.alertaValor.icon='fa-solid fa-question'
      this.cerrarAlerta()
    }else{
      this.profesorService.updateProfesor(idProfesor,DatoDocenteEditado).subscribe(
        res=>{
          this.getProfesores()
          this.modalCloseEditar.nativeElement.click();
          this.alertaValor.mensajeAlerta='Se Editaron los Datos Correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
        },
        err=>{
          this.modalCloseEditar.nativeElement.click();
          this.alertaValor.mensajeAlerta='Error al Editar el Docente'
          this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        }
      )
    }
  }
  eliminarDocente(idDocente:string){
    this.profesorService.deleteProfesor(idDocente).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.getProfesores()
        this.alertaValor.mensajeAlerta='Docente Eliminado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
      },
      err=>{
        this.alertaValor.mensajeAlerta='Error Eliminar al Docente'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.cerrarAlerta()
      }
    )
  }
  crearDocente(){
    this.submitted = true;
    if (this.docenteForm.invalid||(this.f.pass.value!=this.f.confirmPass.value)) {
      this.passNoCoincide='border-danger'
      return;
    }
    var docenteInsert:any={}
    docenteInsert=Object.assign(this.docenteForm.value,this.docentePropiedadesCrear)
    docenteInsert.creado=this.fecha
    delete docenteInsert.confirmPass
    this.profesorService.insertDocente(docenteInsert).subscribe(
      res=>{
        if(res==false){
          console.log('Docente Existe')
        }else{
          this.modalCloseCrear.nativeElement.click();
          this.isCorrectCodigo=false
          this.getProfesores()
          this.alertaValor.mensajeAlerta='Docente Creado Correctamente'
          this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
          this.alertaValor.icon='fa-solid fa-circle-check'
          this.cerrarAlerta()
        }
      },
      err=>{
        this.alertaValor.mensajeAlerta='Error al Crear al Docente'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.cerrarAlerta()
      }
    )
  }
  verificaraCodigo(codigo:string){
    var dataCodigoProfesor:any={
      idTipoCodigo:'2',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoProfesor).subscribe(
      res=>{
        if(res==false){
          this.codigoError='border-danger'
        }else{
          this.isCorrectCodigo=true;
          this.docentePropiedadesCrear.idCodigo=res[0].idCodigo
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarDocentesArray(idProfesor:string){
    this.docenteIndividual=this.listaDocentes.find((x:any)=>x.idProfesor===idProfesor)
  }
  selectedCheck(e:any){
    if(e.target.checked){
      this.isEditPassword='1'
      return this.isEditPassword='1';
    }else{
      this.isEditPassword='0'
      return this.isEditPassword='0';
    }
  }
  noselectedCheck(e:any){
    if(e.target.checked==false){
      this.isEditPassword='0'
      return this.isEditPassword='0';
    }else{
      this.isEditPassword='1'
      return this.isEditPassword='1';
    }
  }
  cerrarAlerta(){
    this.intervalo=setInterval(() => {//
      this.closeAlert.nativeElement.click();
      this.alertaValor.classAlerta='toast hide'
    }, 5000);
  }
  get f() { return this.docenteForm.controls; }
}
