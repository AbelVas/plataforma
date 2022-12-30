import { Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from 'src/app/admin/dashboard/components/services/grados-admin.service';
import { NivelesService } from '../configuraciones/config-basicas/services/niveles.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-lista-grados',
  templateUrl: './lista-grados.component.html',
  styleUrls: ['./lista-grados.component.css']
})
export class ListaGradosComponent implements OnInit {
  nivelSeleccionado:any=[]
  nivelesGet:any=[]
  listaGrados:any=[]
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
  displayedColumns: string[] = ['no','nombre_grado', 'seccion','status','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  constructor(private nivelesService:NivelesService,private gradoService:GradosService) { }
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  ngOnInit(): void {
    this.obtenerNiveles()
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
  obtenerGradoNivel(idGrado:string){
    this.seleccionadoSelectGrado='1';
    this.gradoService.getGradoNivel(idGrado).subscribe(
      res=>{
        this.listaGrados=res;
        this.dataSource = new MatTableDataSource(this.listaGrados);
        this.paginator._intl.itemsPerPageLabel = 'Grados por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
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
}
