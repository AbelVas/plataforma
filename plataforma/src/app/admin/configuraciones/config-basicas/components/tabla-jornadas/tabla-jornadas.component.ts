import { Component, OnInit,ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { JornadasService } from '../../../../services/jornadas.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private elementRef:ElementRef, private jornadaService:JornadasService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
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
        this.toastrService.warning(`No se pueden obtener las jornadas`,'Atención')
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
        this.toastrService.success(`Jornada Creada`,'Realizado')
        this.modalCloseCrear.nativeElement.click();
        this.submitted = false;
        this.crearJornadaForm.reset();
        this.obtenerJornadas()
      },error=>{
        this.modalCloseCrear.nativeElement.click();
        this.toastrService.error(`Jornada no Creada`,'Error')
      }
    )
  }
  eliminarJornada(idJornada:string){
    this.jornadaService.deleteJornada(idJornada).subscribe(
      response=>{
        this.toastrService.success(`Jornada Eliminada`,'Realizado')
        this.modalCloseEliminar.nativeElement.click();
        this.obtenerJornadas();
      },
      error=>{
        this.toastrService.error(`Jornada no Eliminada`,'Error')
        this.modalCloseEliminar.nativeElement.click();
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
        this.toastrService.success(`Jornada Editada`,'Realizado')
        this.obtenerJornadas();
      },
      error=>{
        this.crearJornadaForm.reset();
        this.toastrService.error(`Jornada no Editada`,'Error')
        this.modalCloseEditar.nativeElement.click();
      }
    )
  }
  //para los forms siempre debemos traer los validadores
  get f() { return this.crearJornadaForm.controls; }
}
