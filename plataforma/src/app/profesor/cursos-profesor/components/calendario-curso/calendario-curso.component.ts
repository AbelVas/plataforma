import { Component, OnInit } from '@angular/core';
import { CalendarioCursoService } from '../../../services/calendario-curso.service';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-calendario-curso',
  templateUrl: './calendario-curso.component.html',
  styleUrls: ['./calendario-curso.component.css']
})
export class CalendarioCursoComponent implements OnInit {
  ActividadesInfoCalendario:any=[];
  idCursoCalendario:any;
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };

  Plugins:any = [dayGridPlugin, listPlugin];
  EventsDatosCalendario: any= []
  EventosCalendario:any = [
  ]
  calendarOptions: CalendarOptions= {
      initialView: 'dayGridWeek',
      dayMaxEvents: true,
      plugins: [dayGridPlugin, listPlugin],
      weekends: true,
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
    this.getActividadesCursoCalendario()

  }

  getActividadesCursoCalendario(){
    this.idCursoCalendario = this.ruta.snapshot.paramMap.get('idCurso');
    const idUsuario = this.idCursoCalendario
    this.calendario.getActividadesCurso( idUsuario).subscribe(
      res=>{
        this.ActividadesInfoCalendario=res;
        for(let i =0; i<this.ActividadesInfoCalendario.length; i++){
          this.EventsDatosCalendario[i]={
            title:this.ActividadesInfoCalendario[i].nombre_actividad,
            date:this.ActividadesInfoCalendario[i].fecha_entrega,
            description:this.ActividadesInfoCalendario[i].detalle,
            color: this.ActividadesInfoCalendario[i].color_curso
          }
            this.EventosCalendario=this.EventsDatosCalendario
        }
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }


}
