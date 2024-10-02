import { Component, OnInit } from '@angular/core';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';

@Component({
  selector: 'app-admin-cards-bimestre-dashboard',
  templateUrl: './cards-bimestre.component.html',
  styleUrls: ['./cards-bimestre.component.css']
})
export class CardsBimestreComponent implements OnInit {
  // Indicadores de carga individuales
  loadingAlumnos: boolean = true;
  loadingDocentes: boolean = true;
  loadingGrados: boolean = true;
  loadingAlmacenamiento: boolean = true;

  // Variables para datos obtenidos
  totalAlumnos: number = 0;
  totalDocentes: number = 0;
  totalGrados: number = 0;
  almacenamientoEnGigas: number = 0;
  porcentajeAlmacenamiento: number = 0;

  constructor(private estadisticaService: EstadisticasDashboardService) { }

  ngOnInit(): void {
    this.getTotalAlumnos();
    this.getTotalDocentes();
    this.getTotalGrados();
    this.getEspacioConsumo();
  }

  // Obtener el total de alumnos
  getTotalAlumnos(): void {
    this.estadisticaService.getTotalAlumnos().subscribe(
      res => {
        this.totalAlumnos = res[0].CantidadAlumnos;
        this.loadingAlumnos = false;
      },
      err => {
        console.error(err);
        this.loadingAlumnos = false;
      }
    );
  }

  // Obtener el total de docentes
  getTotalDocentes(): void {
    this.estadisticaService.getCantidadDocentes().subscribe(
      res => {
        this.totalDocentes = res[0].CantidadProfesores;
        this.loadingDocentes = false;
      },
      err => {
        console.error(err);
        this.loadingDocentes = false;
      }
    );
  }

  // Obtener el total de grados
  getTotalGrados(): void {
    this.estadisticaService.getCantidadGrados().subscribe(
      res => {
        this.totalGrados = res[0].CantidadGrados;
        this.loadingGrados = false;
      },
      err => {
        console.error(err);
        this.loadingGrados = false;
      }
    );
  }

  // Obtener el consumo de almacenamiento
  getEspacioConsumo(): void {
    this.estadisticaService.getAlmacenamientoPlataforma().subscribe(
      res => {
        const gigas = 1e9; // Bytes en un GB
        const almacenamientoEnBytes = res[0].almacenamiento_ocupado;
        this.almacenamientoEnGigas = parseFloat((almacenamientoEnBytes / gigas).toFixed(2));
        this.porcentajeAlmacenamiento = (this.almacenamientoEnGigas === 60)
          ? 100
          : parseFloat(((this.almacenamientoEnGigas / 60) * 100).toFixed(1));
        this.loadingAlmacenamiento = false;
      },
      err => {
        console.error(err);
        this.loadingAlmacenamiento = false;
      }
    );
  }
}
