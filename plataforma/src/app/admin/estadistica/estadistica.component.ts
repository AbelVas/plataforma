import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';
import { EstadisticasDashboardService } from '../services/estadisticas-dashboard.service';
import { Colors } from 'chart.js';
Chart.register(Colors);
Chart.register(...registerables);


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements AfterViewInit  {
  @ViewChild('graficoNinosNinas') graficoNinosNinas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoCodigoss') graficoCodigoss!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cambioContrasDocentes') cambioContrasDocentes!: ElementRef<HTMLCanvasElement>;
  chart: Chart = {} as Chart;
  chartCodigos: Chart = {} as Chart;
  chartCambioContraDocente: Chart = {} as Chart;
//variables gráfico 1
  totalNinos:string=''
  totalNinas:string=''
//variable gráfico 2
  totalCodigoUso:string=''
  totalCodigoNoUso:string=''
//variable gráfico 3
  docenteContrasenaCambiada:any=[]


  constructor(private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) {
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    this.generarGraficoPieNinosNinas();
    this.generarGraficoPieCodigosActivosInactivos()
    this.generarGraficoContraDocentes()
  }

  generarGraficoPieNinosNinas() {
    this.estadisticaService.getTotalAlumnosHombres().subscribe(
      resNinos => {
        this.totalNinos = resNinos[0].nino;
        this.estadisticaService.getTotalAlumnosMujeres().subscribe(
          resNinas => {
            this.totalNinas = resNinas[0].nina;
            const data = [ this.totalNinas,this.totalNinos];
            const labels = ['Niñas: '+this.totalNinas,'Niños: '+this.totalNinos];
            const canvas = this.graficoNinosNinas.nativeElement;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              this.chart = new Chart(ctx, {
                type: 'pie',
                data: {
                  labels: labels,
                  datasets: [{
                    data: data,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top' // Puedes ajustar la posición según tus preferencias
                    }
                  },
                  responsive: true
                }
              });
            } else {
              console.error('No se pudo obtener el contexto del canvas.');
            }
          },
          errNinas => {
            console.error('Error al obtener datos de niñas:', errNinas);
          }
        );
      },
      errNinos => {
        console.error('Error al obtener datos de niños:', errNinos);
      }
    );
  }
  generarGraficoPieCodigosActivosInactivos(){
    this.estadisticaService.getTotalCodigosUso().subscribe(
      res=>{
        this.totalCodigoUso=res[0].activo;

        this.estadisticaService.getTotalCodigosNoUso().subscribe(
          res=>{
            this.totalCodigoNoUso=res[0].noActivo;

        const labels=['Códigos usados: '+this.totalCodigoUso,'Códigos disponibles: '+this.totalCodigoNoUso]
        const data = [ this.totalCodigoUso,this.totalCodigoNoUso];
        const canvas = this.graficoCodigoss.nativeElement;
        const ctx1 = canvas.getContext('2d');
        if (ctx1) {
          this.chartCodigos = new Chart(ctx1, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: data,
                backgroundColor: ['rgb(255, 99, 132)','rgb(75, 192, 192)']
              }]
            },
            options: {
              responsive: true,
            }
          });
        } else {
          console.error('No se pudo obtener el contexto del canvas.');
        }
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
  generarGraficoContraDocentes(){
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe(
      res=>{
        this.docenteContrasenaCambiada[0]=res[0].sicambio;
        this.docenteContrasenaCambiada[1]=res[0].nocambio;

        const labels=['Cambiaron Contraseña: '+this.docenteContrasenaCambiada[0],'No Cambiaron Contraseña: '+this.docenteContrasenaCambiada[1]]
        const data =  this.docenteContrasenaCambiada
        const canvas = this.cambioContrasDocentes.nativeElement;
        const ctx1 = canvas.getContext('2d');
        if (ctx1) {
          this.chartCambioContraDocente = new Chart(ctx1, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: data,
                backgroundColor: ['rgb(75, 192, 192)','rgb(255, 99, 132)']
              }]
            },
            options: {
              responsive: true,
            }
          });
        } else {
          console.error('No se pudo obtener el contexto del canvas.');
        }
      },
      err=>{
        console.log(err)
      }
    )


  }
}

