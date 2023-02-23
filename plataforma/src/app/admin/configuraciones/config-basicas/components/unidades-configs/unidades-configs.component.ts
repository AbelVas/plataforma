import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { UnidadesService } from '../../../../services/unidades.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unidades-configs',
  templateUrl: './unidades-configs.component.html',
  styleUrls: ['./unidades-configs.component.css']
})
export class UnidadesConfigsComponent implements OnInit {
  sppinerOn:boolean=true;
  listaUnidades:any=[]
  unidadIndividual:any={
    idUnidad:'',
    unidad:'',
    fecha_inicio:'',
    fecha_final:'',
    estado:''
  }
  unidadEdit:any={
  }
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  //Formulario
  unidadForm=this.formBuilder.group({
    fecha_inicio:new FormControl('',[Validators.required]),
    unidad:new FormControl('',[Validators.required]),
    fecha_final:new FormControl('',[Validators.required]),
    estado:new FormControl('')
  })
  submitted=false;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @Output() alerta=new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataTable: any;
  dataSource:any;
  unidadesPorPagina=10;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','unidad','fecha_inicio','fecha_final','estado','acciones'];
  constructor(private formBuilder:FormBuilder,private unidadService:UnidadesService,private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.getUnidades();
  }
  editarUnidad(idUnidad:string){
    this.submitted = true;
    this.unidadEdit.unidad=this.f.unidad.value
    this.unidadEdit.fecha_final=this.f.fecha_final.value
    this.unidadEdit.fecha_inicio=this.f.fecha_inicio.value
    if(this.f.unidad.value==null||this.f.unidad.value==''){
      delete this.unidadEdit.unidad
    }
    if(this.f.fecha_final.value==null||this.f.fecha_final.value==''){
      delete this.unidadEdit.fecha_final
    }
    if(this.f.fecha_inicio.value==null||this.f.fecha_inicio.value==''){
      delete this.unidadEdit.fecha_inicio
    }
    if(this.f.estado.value==null&&this.unidadEdit.estado==''){
      delete this.unidadEdit.estado
    }
    if(Object.entries(this.unidadEdit).length==0){
      this.toastrService.warning(`Sin datos para modificar`,'Atención')
      this.modalCloseEditar.nativeElement.click();
      this.unidadForm.reset();
    }else{
      this.unidadService.updateUnidad(idUnidad,this.unidadEdit).subscribe(
        res=>{
          this.toastrService.success(`Unidad Editada`,'Realizado')
          this.modalCloseEditar.nativeElement.click();
          this.getUnidades();
          this.unidadForm.reset();
        },
        err=>{
          this.toastrService.error(`Unidad no Editada`,'Error')
          this.modalCloseCrear.nativeElement.click();
        }
      )

    }
  }
  getUnidades(){
    this.unidadService.getUnidades().subscribe(
      res=>{
        this.listaUnidades=res;
        this.dataSource = new MatTableDataSource(this.listaUnidades);
        this.sppinerOn=false;
        this.paginator._intl.itemsPerPageLabel = 'Unidades por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        this.sppinerOn=false;
        console.log(err)
      }
    )
  }
  buscarUnidadesArray(idUnidad:string){
    this.unidadIndividual=this.listaUnidades.find((x:any)=>x.idUnidad===idUnidad)
  }
  crearUnidad(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.unidadForm.invalid) {
      return;
    }
    var unidadInsert:any={
      unidad:this.f.unidad.value,
      fecha_inicio:this.f.fecha_inicio.value,
      fecha_final:this.f.fecha_final.value,
      estado:'1'
    }
    this.unidadService.createUnidad(unidadInsert).subscribe(
      res=>{
        this.toastrService.success(`Unidad Creada`,'Realizado')
        this.modalCloseCrear.nativeElement.click();
        this.submitted = false;
        this.unidadForm.reset();
        this.getUnidades();
      },
      err=>{
        this.toastrService.error(`Unidad no Creada`,'Error')
        this.modalCloseCrear.nativeElement.click();
      }
    )
  }
  eliminarUnidad(idUnidad:string){
    this.unidadService.deleteUnidad(idUnidad).subscribe(
      res=>{
        this.toastrService.success(`Unidad Eliminada`,'Realizado')
        this.modalCloseEliminar.nativeElement.click();
        this.getUnidades()
      },
      err=>{
        this.toastrService.error(`Unidad no Eliminada`,'Error')
        this.modalCloseEliminar.nativeElement.click();
      }
    )
  }
  selectedCheck(e:any){
    if(e.target.checked){
      this.unidadEdit.estado='1'
      return this.unidadIndividual.estado='1';
    }else{
      this.unidadEdit.estado='0'
      return this.unidadIndividual.estado='0';
    }
  }
  noselectedCheck(e:any){
    if(e.target.checked==false){
      this.unidadEdit.estado='0'
      return this.unidadIndividual.estado='0';
    }else{
      this.unidadEdit.estado='1'
      return this.unidadIndividual.estado='1';
    }
  }
  get f() { return this.unidadForm.controls; }
}
