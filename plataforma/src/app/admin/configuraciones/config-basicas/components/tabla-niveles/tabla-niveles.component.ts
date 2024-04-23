import { Component, OnInit,ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { NivelesService } from '../../../../services/niveles.service';
import { JornadasService } from '../../../../services/jornadas.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from 'src/app/web-socket.service';
import decode from "jwt-decode"

@Component({
  selector: 'app-tabla-niveles',
  templateUrl: './tabla-niveles.component.html',
  styleUrls: ['./tabla-niveles.component.css']
})
export class TablaNivelesComponent implements OnInit {
  //datos para que usuarios sepan quien modificó por medio de sockets
  token:any
  idUsuarioToken:any
  nombre_usuario_token:any
  //fin socket data para saber quien modificó
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



  constructor(private socketService:WebSocketService,private nivelesService:NivelesService,private formBuilder:FormBuilder,private jornadaService:JornadasService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.obtenerNiveles();
    this.obtenerJornadas();
    this.token=localStorage.getItem('Acces-Token')
    const {nombre_profesor}:any=decode(this.token);
    const {apellido_profesor}:any=decode(this.token);
    const {idUsuario}:any=decode(this.token);
    this.nombre_usuario_token=nombre_profesor+' '+apellido_profesor;
    this.idUsuarioToken=idUsuario

  // Cambio en la llamada al crear un nivel
  this.socketService.escucharEvento('nuevo-nivel').subscribe((data: any) => {
    this.toastrService.success(data.mensaje, 'Nivel Creado');
    this.obtenerNiveles();
  });

  // Cambio en la llamada al eliminar el nivel
  this.socketService.escucharEvento('Eliminar-nivel').subscribe((data: any) => {
    this.toastrService.success(data.mensaje, 'Nivel Eliminado');
    this.obtenerNiveles();
  });

  // Cambio en la llamada al eliminar el nivel
  this.socketService.escucharEvento('Actualizar-nivel').subscribe((data: any) => {
    this.toastrService.success(data.mensaje, 'Nivel Actualizado');
    this.obtenerNiveles();
  });

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
    this.nivelesService.deleteNivel(idNivel,this.idUsuarioToken,this.nombre_usuario_token).subscribe(
      res=>{
        this.socketService.emitirEvento('Eliminar-nivel', res);
        this.toastrService.success(`Eliminar-nivel`,'Realizado')
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
      this.nivelForm.reset();
    }else if(this.f.idJornada.value==''&&this.f.nivel.value!=''){
      nivelEdit.nivel=this.f.nivel.value;
      this.nivelesService.updateNiveles(idNivel,nivelEdit,this.idUsuarioToken,this.nombre_usuario_token).subscribe(
        res=>{
          this.socketService.emitirEvento('Actualizar-nivel', res);
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
      this.nivelesService.updateNiveles(idNivel,nivelEdit,this.idUsuarioToken,this.nombre_usuario_token).subscribe(
        res=>{
          this.socketService.emitirEvento('Actualizar-nivel', res);
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
      this.nivelesService.updateNiveles(idNivel,nivelEdit,this.idUsuarioToken,this.nombre_usuario_token).subscribe(
        res=>{
          this.socketService.emitirEvento('Actualizar-nivel', res);
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
    this.nivelesService.crearNivel(this.nivelCreadaObj,this.idUsuarioToken,this.nombre_usuario_token).subscribe(
      res=>{
        this.socketService.emitirEvento('nuevo-nivel', res);
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
