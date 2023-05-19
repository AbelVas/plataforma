import { Component, OnInit,ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { NivelesService } from '../../../../services/niveles.service';
import { JornadasService } from '../../../../services/jornadas.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-niveles',
  templateUrl: './tabla-niveles.component.html',
  styleUrls: ['./tabla-niveles.component.css']
})
export class TablaNivelesComponent implements OnInit {
  nivelesGet:any=[];
  jornadasGet:any=[];
  errorServicio:any={};
  nivelIndividual:any={
    idJornada:'',
    nivel:''
  }
  nivelCreadaObj:any=[];
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @Output() alerta=new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataTable: any;
  dataSource:any;
  nivelesPorPagina=10;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no', 'nombre', 'jornada', 'acciones'];
  //formulario
  nivelForm=this.formBuilder.group({
    nivel:new FormControl('',[Validators.required]),
    idJornada:new FormControl('',[Validators.required]),
  })
  submitted=false;
  constructor(private nivelesService:NivelesService,private formBuilder:FormBuilder,private jornadaService:JornadasService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.obtenerNiveles();
    this.obtenerJornadas();
  }
  obtenerNiveles(){
    this.nivelesService.getNiveles().subscribe(
      response=>{
        this.nivelesGet=response;
        this.dataSource = new MatTableDataSource(this.nivelesGet);
        this.paginator._intl.itemsPerPageLabel = 'Niveles por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.errorServicio=''
      },
      error=>{
        this.errorServicio=error
      }
    )
  }
  obtenerJornadas(){
    this.jornadaService.getJornadas().subscribe(
      res=>{
        this.jornadasGet=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarNivelArray(idNivel:string){
    this.nivelIndividual=this.nivelesGet.find((x:any)=>x.idNivel===idNivel)
  }
  eliminarNivel(idNivel:string){
    this.nivelesService.deleteNivel(idNivel).subscribe(
      res=>{
        this.toastrService.success(`Nivel Eliminado`,'Realizado')
        this.modalCloseEliminar.nativeElement.click();
        this.obtenerNiveles()
      },
      error=>{
        this.toastrService.error(`Nivel no Eliminado`,'Error')
        this.modalCloseEliminar.nativeElement.click();
      }
    )
  }
  editarNivel(idNivel:string){
    var nivelEdit:any={}
    this.submitted = true;
    if(this.f.idJornada.value==''&&this.f.nivel.value==''){
      this.toastrService.warning(`Sin datos para modificar`,'Atención')
      this.modalCloseEditar.nativeElement.click();
    }else if(this.f.idJornada.value==''&&this.f.nivel.value!=''){
      nivelEdit.nivel=this.f.nivel.value;
      this.nivelesService.updateNiveles(idNivel,nivelEdit).subscribe(
        res=>{
          this.toastrService.success(`Nivel Editado`,'Realizado')
          this.modalCloseEditar.nativeElement.click();
          this.obtenerNiveles();
          this.nivelForm.reset();
        },
        err=>{
          this.toastrService.error(`Nivel no Editado`,'Error')
          this.modalCloseEditar.nativeElement.click();
          this.nivelForm.reset();
        }
      )
    }else if(this.f.idJornada.value!=''&&this.f.nivel.value==''){
      nivelEdit.idJornada=this.f.idJornada.value;
      this.nivelesService.updateNiveles(idNivel,nivelEdit).subscribe(
        res=>{
          this.toastrService.success(`Jornada del Nivel Editada`,'Realizado')
          this.modalCloseEditar.nativeElement.click();
          this.obtenerNiveles();
          this.nivelForm.reset();
        },
        err=>{
          this.toastrService.error(`Jornada del no Nivel Editada`,'Error')
          this.modalCloseEditar.nativeElement.click();
        })
    }else if(this.f.idJornada.value!=''&&this.f.nivel.value!=''){
      nivelEdit.idJornada=this.f.idJornada.value;
      nivelEdit.nivel=this.f.nivel.value;
      console.log(nivelEdit)
      this.nivelesService.updateNiveles(idNivel,nivelEdit).subscribe(
        res=>{
          this.toastrService.success(`Nivel Editado`,'Realizado')
          this.modalCloseEditar.nativeElement.click();
          this.obtenerNiveles();
          this.nivelForm.reset();
        },
        err=>{
          this.toastrService.error(`Nivel no Editado`,'Error')
          this.modalCloseEditar.nativeElement.click();
        })
    }
  }
  crearNivel(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.nivelForm.invalid) {
      return;
    }
    this.nivelCreadaObj=this.nivelForm.value
    this.nivelesService.crearNivel(this.nivelCreadaObj).subscribe(
      res=>{
        this.toastrService.success(`Nivel Creado`,'Realizado')
        this.modalCloseCrear.nativeElement.click();
        this.submitted = false;
        this.nivelForm.reset();
        this.obtenerNiveles();
      },
      err=>{
        this.toastrService.error(`Nivel no Creado`,'Error')
        this.modalCloseCrear.nativeElement.click();
      }
    )
  }
  get f() { return this.nivelForm.controls; }
}
