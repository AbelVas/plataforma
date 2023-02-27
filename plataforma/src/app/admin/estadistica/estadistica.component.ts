import { Component, OnInit,ElementRef} from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { EstadisticasDashboardService } from '../services/estadisticas-dashboard.service';
import { Colors } from 'chart.js';
Chart.register(Colors);
Chart.register(...registerables);

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  //Chart de niños y niñas
  myChart:any;
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];

  //Chart de codigos
  chartCodigos:any;
  dataCodigos: any;
  labelCodigos: any[] = [];
  realCodigos: any[] = [];

  //Chart de Contrase
  chartContrase:any;
  dataContrase: any;
  labelContrase: any[] = [];
  realContrase: any[] = [];
  constructor(private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) { }

  ngOnInit(): void {

    //Chart Alumnos Niño/Niña
    this.estadisticaService.Prueba().subscribe((result: any) => {
      this.chartdata = result;
      if(this.chartdata!=null){
        //configuracion para la info de las charts
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          //this.labeldata.push(this.chartdata[i].sexo);
          this.realdata.push(this.chartdata[i].CantidadAlumno);
        }
       }
       this.realdata.push(0);
      }
    )
    this.RenderChart(this.labeldata,this.realdata);

    //Chart Codigos uso/no usado
    this.estadisticaService.getTotalCodigosUso().subscribe((result: any) => {
      this.chartCodigos = result;
      if(this.chartCodigos!=null){
        for(let i=0; i<this.chartCodigos.length ;i++){
          this.realCodigos.push(this.chartCodigos[i].activo);
        }
       }
      }
    )
    this.RenderChartCodigos(this.labelCodigos,this.realCodigos);

    //Chart Contraseñas
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe((result: any) => {
      this.chartContrase = result;
      if(this.chartContrase!=null){
        for(let i=0; i<this.chartContrase.length ;i++){
          this.realContrase.push(this.chartContrase[i].CambioContra);
        }
       }
      }
    )
    this.RenderChartContrase(this.labelContrase,this.realContrase);
  }
//esto es de mi parte
  RenderChart(labeldata: any[], realdata: any[]) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#prueba`);
      this.myChart = new Chart(htmlRef, {
        type: 'pie',
        data: {
          labels: ['Niñas', 'Niños'],
          datasets: [{
            label: ' ',
            data: realdata,
          }]
        },
        options: {
        }
    });
  }

  RenderChartCodigos(labelCodigos: any[], realCodigos: any[]) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#codigos`);
      this.myChart = new Chart(htmlRef, {
        type: 'pie',
        data: {
          labels: ['En Uso', 'Sin Usar'],
          datasets: [{
            label: ' ',
            data: realCodigos,
            backgroundColor:['#DBCF41','#F27C3D'],
          }]
        },
        options: {
          scales: {
          }
        }
    });
  }

  RenderChartContrase(labelContrase: any[], realContrase: any[]) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#contrase`);
      this.myChart = new Chart(htmlRef, {
        type: 'pie',
        data: {
          labels: ['Cambiadas', 'No Cambiadas'],
          datasets: [{
            label: ' ',
            data: realContrase,
            backgroundColor:['#73C9EB','#72F263'],
          }]
        },
        options: {
          scales: {
          }
        }
    });
  }

}
