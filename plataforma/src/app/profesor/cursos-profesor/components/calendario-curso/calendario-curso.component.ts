import { Component, OnInit } from '@angular/core';
import { CalendarioCursoService } from '../../services/calendario-curso.service';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendario-curso',
  templateUrl: './calendario-curso.component.html',
  styleUrls: ['./calendario-curso.component.css']
})
export class CalendarioCursoComponent implements OnInit {
  ActividadesInfo:any=[];
  Tareas:any=[];
  idCurso:any;
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };

  Plugins:any = [dayGridPlugin, listPlugin];
  EventsDatos: any= []
  Events:any = [
  ]
  calendarOptions: CalendarOptions= {
      initialView: 'dayGridWeek',
      dayMaxEvents: true,
      plugins: [dayGridPlugin, listPlugin],
      weekends: false,
      locale: esLocale,
      headerToolbar: {
        left: '',
        center: 'title',
        right: '',
        },
        footerToolbar:{
          left: 'prev,next,today',
          center: '',
          right: 'dayGridMonth,dayGridWeek,listWeek',
        },
        eventTextColor:'black',
    };
  constructor(public ruta:ActivatedRoute, public calendario:CalendarioCursoService) { }

  ngOnInit(): void {
    this.getActividadesCurso()
  }

  getActividadesCurso(){
    this.idCurso = this.ruta.snapshot.paramMap.get('idCurso');
    const idUsuario = this.idCurso
    this.calendario.getActividadesCurso( idUsuario).subscribe(
      res=>{
        this.ActividadesInfo=res;
        console.log(res)
        for(let i =0; i<this.ActividadesInfo.length; i++){
          this.EventsDatos[i]={
            title:this.ActividadesInfo[i].nombre_actividad,
            date:this.ActividadesInfo[i].fecha_entrega,
            description:this.ActividadesInfo[i].detalle,
            color: this.ActividadesInfo[i].color_curso
          }
            this.Events=this.EventsDatos
        }
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }


}
