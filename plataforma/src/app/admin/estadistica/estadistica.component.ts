import { Component, OnInit,ElementRef} from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { EstadisticasDashboardService } from '../services/estadisticas-dashboard.service';
Chart.register(...registerables);

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  totalNinos:any=''
  totalNinas:any=''

  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];

  chartdata1: any;
  labeldata1: any[] = [];
  realdata1: any[] = [];

  chartdata2: any;
  labeldata2: any[] = [];
  realdata2: any[] = [];

  chartdata3: any;
  labeldata3: any[] = [];
  realdata3: any[] = [];

  chartdata4: any;
  labeldata4: any[] = [];
  realdata4: any[] = [];
  constructor(private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.estadisticaService.Prueba().subscribe((result: any) => { //Aquí es donde se jala el servicio
      this.chartdata = result;
      if(this.chartdata!=null){
        //configuracion para la info de las charts
        for(let i=0; i<this.chartdata.length ;i++){
          this.labeldata.push(this.chartdata[i].nombre_grado); //este es el titulado de los datos (No necesario en algunos casos)
          this.realdata.push(this.chartdata[i].CantidadAlumno); //lenght de niño y length de niña
        }
       }
      }
    )

    this.RenderChart(this.labeldata,this.realdata);
  }
//esto es de mi parte
  RenderChart(labeldata: any[], realdata: any[]) {
  const myChart = new Chart('pie1', {
  type: 'pie',
  data: {
    labels: ['niño','niña'],
    datasets: [{
      label: 'Estudiantes por grado',
      data: realdata,
    }]
  },
  options: {
    scales: {
    }
  }
});
}

}
