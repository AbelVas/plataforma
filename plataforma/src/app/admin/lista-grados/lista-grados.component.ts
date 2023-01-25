import { Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from 'src/app/admin/services/grados-admin.service';
import { NivelesService } from '../services/niveles.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { SeccionesService } from '../services/secciones.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-grados',
  templateUrl: './lista-grados.component.html',
  styleUrls: ['./lista-grados.component.css']
})
export class ListaGradosComponent implements OnInit {
  sppinerOn:boolean=true;
  rutaParaVerElRetorno:string='';
  idNivelSelecciondo:string='';
  nivelSeleccionado:any=[];
  nivelesGet:any=[];
  listaGrados:any=[];
  listaSecciones:any=[];
  gradoIndividual:any={}
  seleccionadoSelectGrado:string='0';
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
  displayedColumns: string[] = ['no','nombre_grado', 'seccion','cantidad_alumnos','status','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  constructor(private nivelesService:NivelesService,private activedRoute:ActivatedRoute,private gradoService:GradosService,private formBuilder:FormBuilder,private seccionesService:SeccionesService) { }
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  submitted = false;
  gradoFormthis=this.formBuilder.group({
    idNivel:new FormControl('',[Validators.required]),
    idSeccion:new FormControl('',[Validators.required]),
    nombre_grado:new FormControl('',[Validators.required]),
    estatus:new FormControl('')
  })
  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['id']!=null){
      this.rutaParaVerElRetorno=params['id']
      this.obtenerGradoNivel(this.rutaParaVerElRetorno)
    }
    this.obtenerNiveles();
    this.getSecciones();
  }
  crearGrado(){
    this.submitted = true;
    if (this.gradoFormthis.invalid) {
      return;
    }
    var DatoGradoAgregado:any={}
    DatoGradoAgregado.idNivel=this.f.idNivel.value
    DatoGradoAgregado.nombre_grado=this.f.nombre_grado.value
    DatoGradoAgregado.idSeccion=this.f.idSeccion.value
    DatoGradoAgregado.estatus='1'
    this.gradoService.insertarGrado(DatoGradoAgregado).subscribe(
      res=>{
        if(this.idNivelSelecciondo!=''){
          this.getGradosNivel(this.idNivelSelecciondo);
        }
        this.modalCloseCrear.nativeElement.click();
        this.alertaValor.mensajeAlerta='Grado Agregado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
      },
      err=>{
        this.modalCloseCrear.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Crear Grado'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
      }
    )
  }
  editGrado(idGrado:string){
    var DatoGradoEditado:any={}
    if(this.f.nombre_grado.value!=''){
      DatoGradoEditado.nombre_grado=this.f.nombre_grado.value;
    }
    if(this.f.idSeccion.value!=''){
      DatoGradoEditado.idSeccion=this.f.idSeccion.value;
    }
    if(this.f.idNivel.value!=''){
      DatoGradoEditado.idNivel=this.f.idNivel.value;
    }
    DatoGradoEditado.estatus=this.gradoIndividual.estatus
    this.gradoService.updateGrado(idGrado,DatoGradoEditado).subscribe(
      res=>{
        this.getGradosNivel(this.idNivelSelecciondo);
        this.modalCloseEditar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Grado Editado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
      },
      err=>{
        this.modalCloseEditar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Editar Grado'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
      }
    )
  }
  obtenerNiveles(){
    this.nivelesService.getNiveles().subscribe(
      response=>{
        this.nivelesGet=response;
      },
      error=>{
        console.log('Error al obtener el Nivel')
      }
    )
  }
  getSecciones(){
    this.seccionesService.getSecciones().subscribe(
      res=>{
        this.listaSecciones=res;
    },
    err=>{
      console.log('Error Jornadas: '+err)
    }
    )
  }
  getGradosNivel(idNivel:string){
    this.gradoService.getGradoNivel(idNivel).subscribe(
      res=>{
        this.listaGrados=res;
        console.log(this.listaGrados)
        this.dataSource = new MatTableDataSource(this.listaGrados);
        this.paginator._intl.itemsPerPageLabel = 'Grados por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  obtenerGradoNivel(idNivel:string){
    this.idNivelSelecciondo=idNivel;
    this.seleccionadoSelectGrado='1';
    this.getGradosNivel(this.idNivelSelecciondo);
  }
  buscarGradoIndividual(idGrado:string){
    this.gradoIndividual=this.listaGrados.find((x:any)=>x.idGrado===idGrado)
  }
  EliminarGrado(idGrado:string){
    this.gradoService.deleteGrado(idGrado).subscribe(
      res=>{
        this.obtenerGradoNivel(this.nivelSeleccionado)
        this.modalCloseEliminar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Grado Eliminado Correctamente'
        this.alertaValor.classAlerta='bg-success bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-circle-check'
      },
      err=>{
        this.modalCloseEliminar.nativeElement.click();
        this.alertaValor.mensajeAlerta='Error al Eliminar Grado'
        this.alertaValor.classAlerta='bg-danger bottom-0 end-0 position-absolute text-white toast show'
        this.alertaValor.icon='fa-solid fa-xmark'
      }
    )
  }
  selectValue(event:any){
    this.nivelSeleccionado=event.target.value
    this.obtenerGradoNivel(event.target.value);
  }
  selectedCheck(e:any){
    if(e.target.checked){
      return this.gradoIndividual.estatus='1';
    }else{
      return this.gradoIndividual.estatus='0';
    }
  }
  noselectedCheck(e:any){
    if(e.target.checked==false){
      return this.gradoIndividual.estatus='0';
    }else{
      return this.gradoIndividual.estatus='1';
    }
  }
  get f() { return this.gradoFormthis.controls; }
}
