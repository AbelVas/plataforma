import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from '../services/grados-admin.service';
//angular table
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProfesoresService } from '../services/profesores.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormControl,Validators  } from '@angular/forms';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-asignacion-grado-guia',
  templateUrl: './asignacion-grado-guia.component.html',
  styleUrls: ['./asignacion-grado-guia.component.css']
})
export class AsignacionGradoGuiaComponent implements AfterViewInit {

  dataTable: any;
  dataTable2: any;
  dataSource:any;
  dataSource2:any;
  displayedColumns: string[] = ['idGrado','Grado','idProfesor','profesor','acciones'];
  displayedColumns2: string[] = ['idGrado','Grado','profesor','acciones'];
  listaGradosConGuia:any=[];
  listaGradosSinGuia:any=[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCrearCerrar: any;
  @ViewChild('cerrarEditarModal') modalEditarCerrar: any;


  listaProfesores:any=[]
  GradoGuiaIndividualConGuia:any={}
  GradoGuiaIndividualSinGuia:any={}

  gradoGuiaDocenteForm=this.formBuilder.group({
    idProfesor:new FormControl('',[Validators.required]),
  })

  gradoGuiaDocenteFormEditar=this.formBuilder.group({
    idProfesor:new FormControl('',[Validators.required]),
  })

  submitted=false;
  gradoGuiaDocenteAsignado:any=[]
  constructor(private socketService:WebSocketService,private gradoServiceGuia:GradosService, private profesoresService:ProfesoresService,private toastrService:ToastrService,private formBuilder:FormBuilder) {

   }

  ngAfterViewInit(): void {
    this.getGradosConDocente();
    this.getGradosSinDocente();
    this.getProfesores();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  updateGradoGuiaConDocente(){
    this.submitted = true;
    if (this.gradoGuiaDocenteFormEditar.invalid) {
      return;
    }
    var gradoGuiaUpdate:any={}
    gradoGuiaUpdate=Object.assign(this.gradoGuiaDocenteFormEditar.value)
    gradoGuiaUpdate.idGrado=this.GradoGuiaIndividualConGuia.idGrado;
    gradoGuiaUpdate.idGuias=this.GradoGuiaIndividualConGuia.idGuias
    this.gradoServiceGuia.updaateGradoGuiaDocenteRelacion(gradoGuiaUpdate).subscribe(
      res=>{
        this.toastrService.success(`Se pudo editar el docente del Grado`,'Realizado')
        this.modalEditarCerrar.nativeElement.click();
        this.submitted = false;
        this.gradoGuiaDocenteFormEditar.reset();
        this.getGradosConDocente();
      },
      err=>{
        this.toastrService.error(`No se pudo editar el docente del Grado`,'Error')
        this.modalEditarCerrar.nativeElement.click();
        this.gradoGuiaDocenteForm.reset();
      }
    )
  }
  getGradosConDocente(){
    this.gradoServiceGuia.gerGradoGuiaAsignado().subscribe(
      res=>{
        this.listaGradosConGuia=res
        this.dataSource = new MatTableDataSource(this.listaGradosConGuia);
        this.paginator._intl.itemsPerPageLabel = 'Grados por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
  }
  getGradosSinDocente(){
    this.gradoServiceGuia.gerGradoGuiaSinAsignar().subscribe(
      res=>{
        this.listaGradosSinGuia=res
        this.dataSource2 = new MatTableDataSource(this.listaGradosSinGuia);
        this.paginator2._intl.itemsPerPageLabel = 'Grados por Página: ';
        this.dataSource2.paginator2 = this.paginator2;
        this.dataSource2.sort2 = this.sort2;
      },
      err=>{
        console.log(err)
      }
    )
  }
  getProfesores(){
    this.profesoresService.getProfesoresListaSelectCursos().subscribe(
      res=>{
        this.listaProfesores=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarGradoGuiasArrayTabla1(idGuias:string){
    this.GradoGuiaIndividualConGuia=this.listaGradosConGuia.find((x:any)=>x.idGuias===idGuias)
  }
  buscarGradoGuiasArrayTabla2(idGuias:string){
    this.GradoGuiaIndividualSinGuia=this.listaGradosSinGuia.find((x:any)=>x.idGuias===idGuias)
  }
  crearGuiasGrado(){
    this.submitted = true;
    if (this.gradoGuiaDocenteForm.invalid) {
      return;
    }
    var gradoGuiaInsert:any={}
    gradoGuiaInsert=Object.assign(this.gradoGuiaDocenteForm.value)
    gradoGuiaInsert.idGrado=this.GradoGuiaIndividualSinGuia.idGrado
    var idProfesoUsuaraio=gradoGuiaInsert.idProfesor
    this.gradoServiceGuia.crearGradoGuiaDocenteRelacion(gradoGuiaInsert).subscribe(
      res=>{
        this.toastrService.success(`Docente asignado a Grado Guía`,'Realizado')
        //SOCKET MAPEANDO ID
        // En el componente o servicio del administrador
        this.socketService.emitirEvento('insertar-grado-guia-profesor', {
          idProfesor: idProfesoUsuaraio,
          mensaje: 'Se te ha asignado un nuevo Grado Guía'
        });
        this.modalCrearCerrar.nativeElement.click();
        this.submitted = false;
        this.gradoGuiaDocenteForm.reset();
        this.getGradosSinDocente();
        this.getGradosConDocente();
      },
      err=>{
        this.toastrService.error(`Docente no asignado a Grado Guía`,'Error')
        this.modalCrearCerrar.nativeElement.click();
        this.gradoGuiaDocenteForm.reset();
      }
    )
  }
  get f() { return this.gradoGuiaDocenteForm.controls; }
  get g() { return this.gradoGuiaDocenteFormEditar.controls; }

  deleteGuiasGrado(idGuias:string){
    this.gradoServiceGuia.deleteGradoGuiaDocenteRelacion(idGuias).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.getGradosConDocente();
        this.getGradosSinDocente();
        this.toastrService.success(`Docente Guia Eliminado`,'Realizado')
      },
      err=>{
        this.toastrService.error(`Docente Guia Eliminado`,'Error')
      }
    )
  }
}
