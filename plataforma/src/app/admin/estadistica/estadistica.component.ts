import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EstadisticasDashboardService } from '../services/estadisticas-dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements AfterViewInit {
  @ViewChild('graficoNinosNinas') graficoNinosNinas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoCodigoss') graficoCodigoss!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cambioContrasDocentes') cambioContrasDocentes!: ElementRef<HTMLCanvasElement>;


  constructor(private estadisticaService: EstadisticasDashboardService) {}

  ngAfterViewInit(): void {
    // Pasamos directamente las funciones en lugar de sus nombres
    this.generarGrafico(
      this.estadisticaService.getTotalAlumnosHombres.bind(this.estadisticaService),
      this.estadisticaService.getTotalAlumnosMujeres.bind(this.estadisticaService),
      this.graficoNinosNinas,
      'Niños y Niñas',
      ['Niños', 'Niñas'],
      ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
    );

    this.generarGrafico(
      this.estadisticaService.getTotalCodigosUso.bind(this.estadisticaService),
      this.estadisticaService.getTotalCodigosNoUso.bind(this.estadisticaService),
      this.graficoCodigoss,
      'Códigos Activos/Disponibles',
      ['Códigos Usados', 'Códigos Disponibles'],
      ['rgb(75, 192, 192)', 'rgb(255, 99, 132)']
    );

    this.generarGrafico(
      this.estadisticaService.getDocenteContrasenaCambiada.bind(this.estadisticaService),
      null,
      this.cambioContrasDocentes,
      'Cambio de Contraseña Docentes',
      ['Cambió Contraseña', 'No Cambió Contraseña'],
      ['rgb(75, 192, 192)', 'rgb(255, 99, 132)']
    );
  }

  generarGrafico(
    servicio1: () => any,
    servicio2: (() => any) | null,
    canvasRef: ElementRef<HTMLCanvasElement>,
    titulo: string,
    labels: string[],
    colores: string[]
  ): void {
    const canvas = canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      servicio1().subscribe(
        (res1: any) => {
          const valor1:any = res1[0] ? Object.values(res1[0])[0] : 0;
          if (servicio2) {
            servicio2().subscribe(
              (res2: any) => {
                const valor2 = res2[0] ? Object.values(res2[0])[0] : 0;
                this.crearGrafico(ctx, labels, [valor1, valor2], colores);
              },
              (err:any) => console.error('Error en la segunda llamada:', err)
            );
          } else {
            const valor2 = res1[1] ? Object.values(res1[0])[1] : 0; // Cambiar contraseña
            this.crearGrafico(ctx, labels, [valor1, valor2], colores);
          }
        },
        (err:any) => console.error('Error en la primera llamada:', err)
      );
    } else {
      console.error('No se pudo obtener el contexto del canvas.');
    }
  }

  crearGrafico(
    ctx: CanvasRenderingContext2D | null,
    labels: string[],
    data: number[],
    backgroundColor: string[]
  ): void {
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor,
            borderColor: backgroundColor.map(color => color.replace(/[^,]+(?=\))/, '1')),
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          responsive: true
        }
      });
    }
  }
}
