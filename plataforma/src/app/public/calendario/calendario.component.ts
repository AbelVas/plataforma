import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CalendarioService } from './calendario.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

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

  constructor(public calendarioservice:CalendarioService) {
  }

  ngOnInit(): void {
    this.obtenerDatosActividades();
console.log(this.calendarOptions)

  }
  ListaActividadesEventos:any=[];

  obtenerDatosActividades(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.calendarioservice.getActividadesparaEventos(idUsuario).subscribe(
      response=>{
        this.ListaActividadesEventos=response
        for(let i =0; i<this.ListaActividadesEventos.length; i++){
          this.EventsDatos[i]={
            title:this.ListaActividadesEventos[i].nombre_actividad,
            date:this.ListaActividadesEventos[i].fecha_entrega,
            description:this.ListaActividadesEventos[i].detalle
          }
            this.Events=this.EventsDatos
        }
        //console.log(this.EventsDatos[4].date='2023-01-21');
        //this.EventsDatos[4].date='2023-01-03'
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }



}
