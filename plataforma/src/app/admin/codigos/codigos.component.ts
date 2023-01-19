import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { CodigosService } from '../services/codigos.service';

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','codigo','tipo','estado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private codigoService:CodigosService) { }

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
}
