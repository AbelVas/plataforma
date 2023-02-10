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

  myChart:any;
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  constructor(private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.estadisticaService.Prueba().subscribe((result: any) => {
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].nombre_grado);
          this.realdata.push(this.chartdata[i].CantidadAlumno);
        }
       }
      }
    )

    this.RenderChart(this.labeldata,this.realdata);
  }

  RenderChart(labeldata: any[], realdata: any[]) {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#prueba`);
      this.myChart = new Chart(htmlRef, {
  type: 'pie',
  data: {
    labels: labeldata,
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
