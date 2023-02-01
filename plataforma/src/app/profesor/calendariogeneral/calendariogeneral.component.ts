import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { CalendarioProfesorService } from '../services/calendario-profesor.service';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendariogeneral',
  templateUrl: './calendariogeneral.component.html',
  styleUrls: ['./calendariogeneral.component.css']
})
export class CalendariogeneralComponent implements OnInit {
 Cursos:any=[];
  Plugins:any = [dayGridPlugin, listPlugin];
  EventsDatos: any= []
  Events:any = [
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
  constructor(public ruta:ActivatedRoute, public calendario:CalendarioProfesorService) { }

  ngOnInit(): void {
    this.obtenerDatosActividades();
    this.getActividadesCurso();
  }

  ListaActividadesEventos:any=[];

  obtenerDatosActividades(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.calendario.getActividadesparaEventos(idUsuario).subscribe(
      response=>{
        this.ListaActividadesEventos=response
        for(let i =0; i<this.ListaActividadesEventos.length; i++){
          this.EventsDatos[i]={
            title:this.ListaActividadesEventos[i].nombre_actividad,
            date:this.ListaActividadesEventos[i].fecha_entrega,
            description:this.ListaActividadesEventos[i].detalle,
            color: this.ListaActividadesEventos[i].color_curso,
            url: '#/teacher/curso/'+this.ListaActividadesEventos[i].idProfesor+'/' +this.ListaActividadesEventos[i].idCurso+'/' + this.ListaActividadesEventos[i].idGrado
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

  getActividadesCurso(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.calendario.getCursoporProfesor( idUsuario).subscribe(
      res=>{
        this.Cursos=res;
        console.log(this.Cursos)
        },
      err=>{
        console.log('Error:'+err)
      }
    )
  }

}
