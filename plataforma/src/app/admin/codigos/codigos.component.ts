import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { CodigosService } from '../services/codigos.service';
import { ToastrService } from 'ngx-toastr'; // PASO 1: IMPORTAR EL SERVICIO, ESTA RUTA NUNCA CAMBIA

@Component({
  selector: 'app-codigos',
  templateUrl: './codigos.component.html',
  styleUrls: ['./codigos.component.css']
})
export class CodigosComponent implements OnInit {
  sppinerOn:boolean=true;
  listaCodigos:any=[]
  codigoIndividual:any={}
  dataTable: any;
  dataSource:any;
  cantidadRegistros:any=[]
  codigoPorPagina=10;
  errorServicio:any={};
  codigoVacioError='form-control';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','codigo','tipo','estado','editar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private codigoService:CodigosService, private toastrService:ToastrService) { } // PASO 2: CREAR EL COSO ESE

  ngOnInit(): void {
    this.getCodigos()
  }
  getCodigos(){
    this.codigoService.getCodigos().subscribe(
      res=>{
        for(let i=0;i<res.length;i++){
          res[i].no=i+1;
        }
        this.listaCodigos=res
        this.cantidadRegistros=this.listaCodigos.length
        this.dataSource = new MatTableDataSource(this.listaCodigos);
        this.sppinerOn=false;
        this.paginator._intl.itemsPerPageLabel = 'Códigos por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        this.sppinerOn=false;
        console.log(err)
      }
    )
  }
  buscarCodigoArray(idCodigo:string){
    this.codigoIndividual=this.listaCodigos.find((x:any)=>x.idCodigo===idCodigo)
  }

  EditCodigo(idCodigo:string){
    this.errorServicio='';

    if(this.codigoIndividual.codigo==''){
      this.codigoVacioError='form-control border-danger';
    }else{
      this.codigoVacioError='form-control';
      const codigo={
        idCodigo:this.codigoIndividual.idCodigo,
        codigo:this.codigoIndividual.codigo
      }
      this.codigoService.updateCodigo(idCodigo,codigo).subscribe(
        res=>{
          this.getCodigos();
          this.toastrService.success(`Codigo Editado`,'Realizado')  // PASO 3: PONER EL MENSAJITO, SE COLOCARÍA DESPUÉS DE REALIZAR UNA ACCIÓN
                                                                    // .success o .error define el color, lo que esta entre comillas el mensaje
                                                                    // La primera parte es el body y la segunda el encabezado del mensaje
        },
        err=>{
          this.errorServicio=err;
          this.toastrService.error(`Codigo no Editado`,'Error')     // LO MISMO AQUÍ
        }
      )
    }
  }
}
