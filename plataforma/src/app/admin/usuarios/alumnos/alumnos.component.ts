import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { CodigosService } from '../../dashboard/components/services/codigos.service';
import { AlumnosService } from './alumnos.service';
import { GradosService } from '../../dashboard/components/services/grados-admin.service';

@Component({
  selector: 'app-alumnos-admin-list',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  listaAlumnos:any=[];
  listaGradosSelect:any=[]
  alumnoInfividual:any={}
  isEditPassword:string='0'
  variable:string='1'
  isCorrectCodigo:boolean=false
  codigoError:string=''
  passNoCoincide:string=''
  alumnoPropiedadesCrear:any={
    imagen:'assets/img/blank_profile.png',
    activo:'1',
    idRol:'4',
    idCodigo:'',
    ver_notas:'1'
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
  alumnosPorPagina=9;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','alumno','grado','usuario','estado','acciones'];
  alumnoForm=this.formBuilder.group({
    nombres_alumno:new FormControl('',[Validators.required]),
    apellidos_alumno:new FormControl('',[Validators.required]),
    idGrado:new FormControl('',[Validators.required]),
    sexo:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
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
  constructor(private alumnosService:AlumnosService,private formBuilder:FormBuilder,private codigoService:CodigosService,private gradoService:GradosService) { }

  ngOnInit(): void {
    this.getAlumnos();
    this.getGrados();
  }
  editarAlumno(idAlumno:string){

  }
  getGrados(){
    this.gradoService.getGrados().subscribe(
      res=>{
        this.listaGradosSelect=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getAlumnos(){
    this.alumnosService.getAlumno().subscribe(
      res=>{
        this.listaAlumnos=res
        this.dataSource = new MatTableDataSource(this.listaAlumnos);
        this.paginator._intl.itemsPerPageLabel = 'Alumno por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
  }
  crearAlumno(){
    this.submitted = true;
    if (this.alumnoForm.invalid||(this.f.pass.value!=this.f.confirmPass.value)) {
      this.passNoCoincide='border-danger'
      return;
    }
    var alumnoInsert:any={}
    alumnoInsert=Object.assign(this.alumnoForm.value,this.alumnoPropiedadesCrear)
    alumnoInsert.creado=this.fecha
    delete alumnoInsert.confirmPass

    this.alumnosService.insertAlumno(alumnoInsert).subscribe(
      res=>{
        this.modalCloseCrear.nativeElement.click();
        this.alumnoForm.reset();
        this.isCorrectCodigo=false
        this.getAlumnos()
        this.alertaValor.mensajeAlerta='Alumno Creado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
      },
      err=>{
        this.alertaValor.mensajeAlerta='Error al Crear al Alumno'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.cerrarAlerta()
      }
    )
  }
  eliminarAlumno(idAlumno:string){
    this.alumnosService.deleteAlumno(idAlumno).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.alumnoForm.reset();
        this.isCorrectCodigo=false
        this.getAlumnos()
        this.alertaValor.mensajeAlerta='Alumno Eliminado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.cerrarAlerta()
      },
      err=>{
        this.alertaValor.mensajeAlerta='Error al Eliminar al Alumno'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.cerrarAlerta()
      }
    )
  }
  verificaraCodigo(codigo:string){
    var dataCodigoProfesor:any={
      idTipoCodigo:'3',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoProfesor).subscribe(
      res=>{
        if(res==false){
          this.codigoError='border-danger'
        }else{
          this.isCorrectCodigo=true;
          this.alumnoPropiedadesCrear.idCodigo=res[0].idCodigo
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarAlumnoArray(idAlumno:string){
    this.alumnoInfividual=this.listaAlumnos.find((x:any)=>x.idAlumno===idAlumno)
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
  get f() { return this.alumnoForm.controls; }
}
