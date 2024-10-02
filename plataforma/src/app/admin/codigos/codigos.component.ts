import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CodigosService } from '../services/codigos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-codigos',
  templateUrl: './codigos.component.html',
  styleUrls: ['./codigos.component.css']
})
export class CodigosComponent implements OnInit {
  spinnerOn: boolean = true;
  listaCodigos: any[] = [];
  codigoIndividual: any = {};
  dataSource!: MatTableDataSource<any>;
  codigoVacioError = 'form-control';
  // Aquí se define la cantidad de códigos por página
  codigoPorPagina: number = 10;  // Define el número de elementos por página

  displayedColumns: string[] = ['no', 'codigo', 'tipo', 'estado', 'editar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  // ViewChild para MatSort

  constructor(private codigoService: CodigosService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getCodigos();
  }

  getCodigos(): void {
    this.codigoService.getCodigos().subscribe(
      res => {
        this.listaCodigos = res.map((codigo: any, index: number) => ({
          ...codigo,
          no: index + 1
        }));

        this.dataSource = new MatTableDataSource(this.listaCodigos);
        // Asignar paginator y sort después de configurar el dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  // Enlazar MatSort aquí
        this.spinnerOn = false;
      },
      err => {
        this.spinnerOn = false;
        this.toastrService.error('Error al obtener los códigos', 'Error');
        console.error(err);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarCodigoArray(idCodigo: string): void {
    this.codigoIndividual = this.listaCodigos.find(codigo => codigo.idCodigo === idCodigo);
  }

  EditCodigo(idCodigo: string): void {
    if (!this.codigoIndividual.codigo) {
      this.codigoVacioError = 'form-control border-danger';
      return;
    }

    this.codigoVacioError = 'form-control';
    const codigo = {
      idCodigo: this.codigoIndividual.idCodigo,
      codigo: this.codigoIndividual.codigo
    };

    this.codigoService.updateCodigo(idCodigo, codigo).subscribe(
      () => {
        this.getCodigos();
        this.toastrService.success('Código editado correctamente', 'Realizado');
      },
      err => {
        this.toastrService.error('Error al editar el código', 'Error');
        console.error(err);
      }
    );
  }
}
