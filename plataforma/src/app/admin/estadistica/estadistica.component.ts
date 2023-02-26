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
<<<<<<< HEAD
  //Chart de niños y niñas
  myChart:any;
=======
  totalNinos:any=''
  totalNinas:any=''

>>>>>>> acfa93b1a1ac01bd64ab7d6302a2e6a276b1b460
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];

<<<<<<< HEAD
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
=======
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
>>>>>>> acfa93b1a1ac01bd64ab7d6302a2e6a276b1b460
  constructor(private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) { }

  ngOnInit(): void {

<<<<<<< HEAD
    //Chart Alumnos Niño/Niña
    this.estadisticaService.Prueba().subscribe((result: any) => {
=======
    this.estadisticaService.Prueba().subscribe((result: any) => { //Aquí es donde se jala el servicio
>>>>>>> acfa93b1a1ac01bd64ab7d6302a2e6a276b1b460
      this.chartdata = result;
      if(this.chartdata!=null){
        //configuracion para la info de las charts
        for(let i=0; i<this.chartdata.length ;i++){
<<<<<<< HEAD
          //console.log(this.chartdata[i]);
          //this.labeldata.push(this.chartdata[i].sexo);
          this.realdata.push(this.chartdata[i].CantidadAlumno);
=======
          this.labeldata.push(this.chartdata[i].nombre_grado); //este es el titulado de los datos (No necesario en algunos casos)
          this.realdata.push(this.chartdata[i].CantidadAlumno); //lenght de niño y length de niña
>>>>>>> acfa93b1a1ac01bd64ab7d6302a2e6a276b1b460
        }
       }
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
<<<<<<< HEAD
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
          scales: {
          }
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
          }]
        },
        options: {
          scales: {
          }
        }
    });
=======
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
>>>>>>> acfa93b1a1ac01bd64ab7d6302a2e6a276b1b460
  }

}
