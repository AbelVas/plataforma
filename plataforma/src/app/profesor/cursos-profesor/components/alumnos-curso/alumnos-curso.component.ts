import { Component, OnInit, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from 'src/app/profesor/services/card-resumen.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})
export class AlumnosCursoComponent implements OnInit {

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute, private elementRef: ElementRef ) { }
  sppinerOn:boolean=true;
  idGradoCurso:string='';
  alumnosGet:any=[
  ];
  EventosChart:any=[];
  Sex:any=[]
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  myChart:any;

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.obtenerAlumnosCursos();


    this.cardResumenService.Prueba().subscribe((result: any) => {
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

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
        console.log(this.alumnosGet)

        }

    )
  }
}

