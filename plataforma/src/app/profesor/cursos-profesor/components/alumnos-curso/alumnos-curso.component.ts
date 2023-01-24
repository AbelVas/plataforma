import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from 'src/app/profesor/services/card-resumen.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})
export class AlumnosCursoComponent implements OnInit {

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute ) { }
  sppinerOn:boolean=true;
  idGradoCurso:string='';
  alumnosGet:any=[
  ];
  Sex:any=[]
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.obtenerAlumnosCursos();
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
        for(let i=0; i<this.alumnosGet.length; i++){

          this.Sex={
            sexoEstudiante: this.alumnosGet[i].sexo
          }

        }
        console.log(this.alumnosGet)
      }
    )
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
