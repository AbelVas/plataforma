import { Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from 'src/app/admin/services/grados-admin.service';
import { NivelesService } from '../services/niveles.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { SeccionesService } from '../services/secciones.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuadroGuiaService } from '../services/cuadro-guia.service';
import { CuadroFinalService } from '../services/cuadro-final.service';


@Component({
  selector: 'app-lista-grados',
  templateUrl: './lista-grados.component.html',
  styleUrls: ['./lista-grados.component.css']
})
export class ListaGradosComponent implements OnInit {
  sppinerOn3:boolean=false;
  sppinerOn:boolean=false;
  sppinerOn2:boolean=false;
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
  //consolidado final
  cursosFinal:any=[]
  CantidadCursosFinal:any='';
  tablaFinal:any=[{}];
  //consolidado bimestral
  GradoSeccion:any=[{}];
  idGrado:any
  alumnosGrado:any=[]
  CantidadAlumnos:any;
  cursos:any=[]
  tabla:any=[{}];
  CantidadCursos:any='';
  bimestreSeleccionado:string='SELECCIONE PARA ACTUALIZAR';
  buscarBimestre=this.formBuilder.group({
    bimestre:new FormControl('',[Validators.required]),
  })
  errorLogininputs='form-select'
  //fin consolidado bimestral
  displayedColumns: string[] = ['no','nombre_grado', 'seccion','cantidad_alumnos','status','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  constructor(private cuadroFinal:CuadroFinalService,private cuadroGuia:CuadroGuiaService,private nivelesService:NivelesService,private activedRoute:ActivatedRoute,private gradoService:GradosService,private formBuilder:FormBuilder,private seccionesService:SeccionesService,private toastrService:ToastrService) { }
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
  //consolidado Final
  vaciarVariablesFinal(){
    this.cursosFinal=null
    this.CantidadCursosFinal=null
    this.tablaFinal=null
  }
  cuadroFinalSeleccionado(idGrado:any){
    this.sppinerOn3=true
    this.obtenerGradoSeccionFinal(idGrado)
    this.obtenerCursosGradoFinal(idGrado)
    this.obtenerNotasCursosFinal(idGrado);
  }
  obtenerGradoSeccionFinal(idGrado:any){
    this.cuadroGuia.obtenerGradoSeccion(idGrado).subscribe(
      res=>{
        this.GradoSeccion=res

      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerCursosGradoFinal(idGrado:any){
    this.cuadroFinal.obtenerCursosGrado(idGrado).subscribe(
      res=>{
       this.cursosFinal=res
       this.CantidadCursosFinal=this.cursosFinal.length
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerNotasCursosFinal(idGrado:any){
    this.cuadroFinal.obtenerNotasCuadroFinal(idGrado).subscribe(
      res=>{
        this.tablaFinal=res
        this.sppinerOn3=false;
      },
      err=>{
        console.log(err)
      }
    )
  }
  //Fin Consolidado Final
  //Consolidado Bimestral
  vaciarVariablesBimestral(){
    this.cursos=[]
    this.buscarBimestre.reset()
    this.CantidadCursos=0
  }
  obtenerGradoSeccion(idGrado:any){
    this.cuadroGuia.obtenerGradoSeccion(idGrado).subscribe(
      res=>{
        this.GradoSeccion=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  GradoSeleccionado(idGrado:any){
    this.idGrado=idGrado
  }
  consolidadoBuscar(){
    this.sppinerOn2=true;
    if (this.buscarBimestre.invalid) {
      this.errorLogininputs='form-select border-danger';
      return;
    }
    var loginData:any={}
    loginData=Object.assign(this.buscarBimestre.value)
    if(loginData.bimestre==1){
      this.bimestreSeleccionado="Primer Bimestre"
    }else if(loginData.bimestre==2){
      this.bimestreSeleccionado="Segundo Bimestre"
    }else if(loginData.bimestre==3){
      this.bimestreSeleccionado="Tercer Bimestre"
    }else if(loginData.bimestre==4){
      this.bimestreSeleccionado="Cuarto Bimestre"
    }
    this.obtenerAlumnosGrado();
    this.obtenerNotasCursos(loginData.bimestre)
    this.obtenerGradoSeccion(this.idGrado)
    this.obtenerAlumnosGrado();
    this.obtenerCursosGrado();
  }

  obtenerNotasCursos(idUnidad:any){
    var unidad=idUnidad
    this.cuadroGuia.obtenerNotasCuadroGuia(this.idGrado,unidad).subscribe(
      res=>{
        this.tabla=res
        this.sppinerOn2=false;
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerAlumnosGrado(){
    this.cuadroGuia.getAlumnosGradoCuadroGuia(this.idGrado).subscribe(
      res=>{
        this.alumnosGrado=res
        this.CantidadAlumnos=this.alumnosGrado.length
      },
      err=>{
        console.log(err)
      }
    )
  }
  obtenerCursosGrado(){
    this.cuadroGuia.obtenerCursosGrado(this.idGrado).subscribe(
      res=>{
       this.cursos=res
       this.CantidadCursos=this.cursos.length
      },
      err=>{
        console.log(err)
      }
    )
  }
  //Fin consolidado Bimestral
  //Imprimir
  PrintThis(){
    window.print();
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
        this.toastrService.success(`Grado Creado`,'Realizado')
      },
      err=>{
        this.modalCloseCrear.nativeElement.click();
        this.toastrService.error(`Grado no Creado`,'Error')
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
        this.toastrService.success(`Grado Editado`,'Realizado')
      },
      err=>{
        this.modalCloseEditar.nativeElement.click();
        this.toastrService.error(`Grado no Editado`,'Error')
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
        this.toastrService.success(`Grado Eliminado`,'Realizado')
      },
      err=>{
        this.modalCloseEliminar.nativeElement.click();
        this.toastrService.error(`Grado no Eliminado`,'Error')
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
