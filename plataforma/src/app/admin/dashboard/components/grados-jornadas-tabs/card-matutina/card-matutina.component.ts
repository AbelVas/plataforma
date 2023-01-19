import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GradosService } from 'src/app/admin/services/grados-admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CuadroGuiaService } from 'src/app/admin/services/cuadro-guia.service';
import { CursosAlumnosGradosService } from 'src/app/admin/services/cursos-alumnos-grados.service';
import { GradosAlumnosService } from 'src/app/admin/services/grados-alumnos.service';



@Component({
  selector: 'app-card-matutina-admin-grados-jornadas',
  templateUrl: './card-matutina.component.html',
  styleUrls: ['./card-matutina.component.css']
})
export class CardMatutinaComponent implements OnInit {
  gradosLista:any=[];
  gradoIndividual:any={}
  dataTable: any;
  gradosListaObject: any={};
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };
  dataSource:any;
  gradosPorPagina=10;
  //para llenar el select de ingresar grados
  nivelesModal:any=[];
  seccionesModal:any=[];
  NivelSeleccionado:any;
  SeccionSeleccionada:any;
  nombreGrado:any;
  //controles para evitar que metan un grado vacío
  gradoVacioError='form-control';
  selectVacioSeccion='form-select';
  selectVacioNivel='form-select'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() niveles:any=[{}];
  @Input() secciones:any=[{}];

  displayedColumns: string[] = ['nombre_grado', 'seccion', 'nivel','status','idGrado'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consolidadoList:any=[]
  bimestreSeleccionadoConsolidado:any={
    idUnidad:''
  }
  cursosConsolidado:any=[]
  alumnosConsolidado:any=[]
  notasCursoConsolidado:any=[]
  noAlumnosConsolidado:any=[]
  consolidado_resumen:any=[]
  constructor(private gradoService:GradosService,private cuadroGuiaService:CuadroGuiaService,private cursoGradoService:CursosAlumnosGradosService, private alumnosGrado:GradosAlumnosService) { }
  ngOnInit(): void {
    this.getGradosMatutina()
    this.nivelesModal=(this.niveles);
    this.seccionesModal=this.secciones;
  }
  consolidado(idGrado:string){

    this.cursoGradoService.getCursosGrado(idGrado).subscribe(
      res=>{
        this.cursosConsolidado=res
          this.bimestreSeleccionadoConsolidado={idUnidad:'1'}
          this.cuadroGuiaService.getCursosNotasGradoGuia(idGrado,this.bimestreSeleccionadoConsolidado).subscribe(
            res=>{
              this.notasCursoConsolidado=res
            },
            err=>{
              console.log(err)
            }
          )
      },
      err=>{
        console.log(err)
      }
    )
  }
  getGradosMatutina(){
    const idJornada='1';
    this.gradoService.getGradoJornada(idJornada).subscribe(
      res=>{

        this.gradosLista=res;
        this.dataSource = new MatTableDataSource(this.gradosLista);
        this.paginator._intl.itemsPerPageLabel = 'Grados por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.errorServicio='no'
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }
  buscarGradoIndividual(idGrado:string){
    this.gradoIndividual=this.gradosLista.find((x:any)=>x.idGrado===idGrado)
  }
  modalIngresar(idNivel:string,idSeccion:string){
    if(idSeccion==undefined){
      this.selectVacioSeccion='form-select border-danger';
    }else{
      if(this.nombreGrado==undefined){
        this.gradoVacioError='form-control border-danger';
     }else{
      if(idNivel==undefined){
        this.selectVacioNivel='form-select border-danger'
      }else{
          this.gradoVacioError='form-control';
          this.selectVacioSeccion='form-select';
          this.selectVacioNivel='form-select'
          const grado={
            idSeccion:idSeccion,
            idNivel:idNivel,
            nombre_grado:this.nombreGrado,
            estatus:'1'
          }
          this.gradoService.insertarGrado(grado).subscribe(
            res=>{
              this.NivelSeleccionado=''
              this.SeccionSeleccionada=''
              this.getGradosMatutina()
            },
            err=>{
              this.errorServicio=err;
            }
          )
      }
     }
    }
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
  EditGrado(idGrado:string,idNivel:string,idSeccion:string){
    this.errorServicio='';
    if(this.gradoIndividual.idNivel!=idNivel&&idNivel!=undefined){
      this.gradoIndividual.idNivel=idNivel
    }

    if(this.gradoIndividual.idSeccion!=idSeccion&&idSeccion!=undefined){
      this.gradoIndividual.idSeccion=idSeccion;
    }

    if(this.gradoIndividual.nombre_grado==''){
      this.gradoVacioError='form-control border-danger';
    }else{
      this.gradoVacioError='form-control';
      const grado={
        idSeccion:this.gradoIndividual.idSeccion,
        idNivel:this.gradoIndividual.idNivel,
        nombre_grado:this.gradoIndividual.nombre_grado,
        estatus:this.gradoIndividual.estatus
      }
      this.gradoService.updateGrado(idGrado,grado).subscribe(
        res=>{
          this.NivelSeleccionado=''
          this.SeccionSeleccionada=''
          this.getGradosMatutina();
        },
        err=>{
          this.errorServicio=err;
        }
      )
    }
  }
  EliminarGrado(idGrado:string){
    this.gradoService.deleteGrado(idGrado).subscribe(
      res=>{
        this.errorService.codigoError=''
        this.getGradosMatutina()
      },
      err=>{
        this.errorService=err
      }
    )
  }
}
