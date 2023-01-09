import { Component, OnInit } from '@angular/core';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { DahboardService } from '../../../../dashboard/services/dahboard.service';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendario-resumen-curso',
  templateUrl: './calendario-resumen-curso.component.html',
  styleUrls: ['./calendario-resumen-curso.component.css']
})
export class CalendarioResumenCursoComponent implements OnInit {
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
        eventColor:'skyblue',
    };


  constructor(public ruta:ActivatedRoute, public DahSer:DahboardService) { }

  ngOnInit(): void {
    this.getActividadesCurso()
  }
  getActividadesCurso(){
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    const idUsuario = this.idCurso
    this.DahSer.getActividadesCurso( idUsuario).subscribe(
      res=>{
        this.ActividadesInfo=res;
        console.log(res)
        for(let i =0; i<this.ActividadesInfo.length; i++){
          this.EventsDatos[i]={
            title:this.ActividadesInfo[i].nombre_actividad,
            date:this.ActividadesInfo[i].fecha_entrega,
            description:this.ActividadesInfo[i].detalle
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
