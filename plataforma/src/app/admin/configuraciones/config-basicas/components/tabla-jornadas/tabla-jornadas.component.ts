import { Component, OnInit,ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { JornadasService } from '../../services/jornadas.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-tabla-jornadas-config',
  templateUrl: './tabla-jornadas.component.html',
  styleUrls: ['./tabla-jornadas.component.css']
})
export class TablaJornadasComponent implements OnInit {
  jornadasGet:any=[];
  errorServicio:any={};
  jornadasIndividual:any={
    idJornada:'',
    jornada:''
  }
  jornadaCreadaObj:any=[];
  crearJornadaForm=this.formBuilder.group({
    jornada:new FormControl('',[Validators.required]),
  })
  constructor(private elementRef:ElementRef, private jornadaService:JornadasService,private formBuilder:FormBuilder) { }
  @Output() alerta=new EventEmitter<any>();
  ngOnInit(): void {
    this.obtenerJornadas()
  }
  //Configuracion Tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  dataTable: any;
  dataSource:any;
  gradosPorPagina=10;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no', 'nombre', 'acciones'];
  //fin cosas tabla
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  submitted=false;
  obtenerJornadas(){
    this.jornadaService.getJornadas().subscribe(
      response=>{
        this.jornadasGet=response;
        this.dataSource = new MatTableDataSource(this.jornadasGet);
        this.paginator._intl.itemsPerPageLabel = 'Jornadas por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.errorServicio=''
      },
      error=>{
        this.alertaValor.mensajeAlerta='Error Obtener la Jornada, Detalle: '
        this.alertaValor.classAlerta='toast  text-white bg-danger show position-absolute bottom-0 end-0'
      }
    )
  }
  buscarJornadasArray(idNivel:string){
    this.jornadasIndividual=this.jornadasGet.find((x:any)=>x.idJornada===idNivel)
  }
  crearJornada(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.crearJornadaForm.invalid) {
      return;
    }
    this.jornadaCreadaObj=this.crearJornadaForm.value
    this.jornadaService.insertJornada(this.jornadaCreadaObj).subscribe(
      response=>{
        this.alertaValor.mensajeAlerta='Jornada Creada Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.modalCloseCrear.nativeElement.click();
        this.submitted = false;
        this.crearJornadaForm.reset();
        this.obtenerJornadas()
        this.enviarAlertaResponse()
      },error=>{
        this.modalCloseCrear.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Crear la Jornada, Detalle: '+error.msg+', Código: '+error.codigo
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.enviarAlertaResponse()
      }
    )
  }
  eliminarJornada(idJornada:string){
    this.jornadaService.deleteJornada(idJornada).subscribe(
      response=>{
        this.alertaValor.mensajeAlerta='Jornada Eliminada Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.modalCloseEliminar.nativeElement.click();
        this.obtenerJornadas();
        this.enviarAlertaResponse()
      },
      error=>{
        this.alertaValor.mensajeAlerta='Error al Eliminar la Jornada, Detalle: '+error.msg+', Código: '+error.codigo
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.modalCloseEliminar.nativeElement.click();
        this.enviarAlertaResponse()
      }
    )
  }
  editarJornada(idJornada:string){
    this.submitted = true;
    // stop here if form is invalid
    if (this.crearJornadaForm.invalid) {
      return;
    }
      this.jornadaCreadaObj=this.crearJornadaForm.value
      this.jornadaService.updateJornada(idJornada,this.jornadaCreadaObj).subscribe(
      response=>{
        this.modalCloseEditar.nativeElement.click();
        this.crearJornadaForm.reset();
        this.alertaValor.mensajeAlerta='Jornada Editada Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
        this.obtenerJornadas();
        this.enviarAlertaResponse()
      },
      error=>{
        this.crearJornadaForm.reset();
        this.alertaValor.mensajeAlerta='Error al Editar la Jornada, Detalle: '+error.msg+', Código: '+error.codigo
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-triangle-exclamation'
        this.modalCloseEditar.nativeElement.click();
        this.enviarAlertaResponse()
      }
    )
  }
  enviarAlertaResponse(){
    this.alerta.emit(this.alertaValor)
  }
  //para los forms siempre debemos traer los validadores
  get f() { return this.crearJornadaForm.controls; }
}
