import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SeccionesService } from '../../../../services/secciones.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-secciones',
  templateUrl: './tabla-secciones.component.html',
  styleUrls: ['./tabla-secciones.component.css']
})
export class TablaSeccionesComponent implements OnInit {
  listaSecciones:any=[]
  seccionIndividual:any={
    idSeccion:'',
    seccion:''
  }
  seccionCreadaObj:any=[];
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  dataTable: any;
  dataSource:any;
  seccionesPorPagina=10;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @Output() alerta=new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no', 'nombre', 'acciones'];
  //formulario
  seccionForm=this.formBuilder.group({
    seccion:new FormControl('',[Validators.required]),
  })
  submitted=false;
  constructor(private serviceSecciones:SeccionesService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.getSecciones()
  }
  editarSeccion(idSeccion:string){
    var nivelEdit:any={}
    this.submitted=true
    if(this.f.seccion.value==''){
      this.toastrService.warning(`Sin datos para modificar`,'Atención')
      this.submitted = false;
      this.modalCloseEditar.nativeElement.click();
      this.seccionForm.reset();
    }else if(this.f.seccion.value!=''){
      nivelEdit.seccion=this.f.seccion.value
      this.serviceSecciones.updateSeccion(idSeccion,nivelEdit).subscribe(
        res=>{
          this.toastrService.success(`Sección Editada`,'Realizado')
          this.modalCloseEditar.nativeElement.click();
          this.getSecciones();
          this.seccionForm.reset();
        },
        err=>{
          this.toastrService.error(`Sección no Editada`,'Error')
          this.modalCloseEditar.nativeElement.click();
        }
      )
    }
  }
  getSecciones(){
    this.serviceSecciones.getSecciones().subscribe(
      res=>{
        this.listaSecciones=res;
        this.dataSource = new MatTableDataSource(this.listaSecciones);
        this.paginator._intl.itemsPerPageLabel = 'Secciones por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarSeccionArray(idSeccion:string){
    this.seccionIndividual=this.listaSecciones.find((x:any)=>x.idSeccion===idSeccion)
  }
  crearSeccion(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.seccionForm.invalid) {
      return;
    }
    this.seccionCreadaObj=this.seccionForm.value
    this.serviceSecciones.insertSeccion(this.seccionCreadaObj).subscribe(
      res=>{
        this.toastrService.success(`Sección Creada`,'Realizado')
        this.submitted = false;
        this.modalCloseCrear.nativeElement.click();
        this.seccionForm.reset();
        this.getSecciones()
      },
      err=>{
        this.toastrService.error(`Sección no Creada`,'Error')
        this.submitted = false;
        this.modalCloseCrear.nativeElement.click();
      }
    )
  }
  eliminarSeccion(idSeccion:string){
    this.serviceSecciones.deleteSeccion(idSeccion).subscribe(
      res=>{
        this.toastrService.success(`Sección Eliminada`,'Realizado')
        this.modalCloseEliminar.nativeElement.click();
        this.getSecciones()
      },
      err=>{
        this.toastrService.error(`Sección no Eliminada`,'Error')
        this.modalCloseEliminar.nativeElement.click();
      }
    )
  }
  get f() { return this.seccionForm.controls; }
}
