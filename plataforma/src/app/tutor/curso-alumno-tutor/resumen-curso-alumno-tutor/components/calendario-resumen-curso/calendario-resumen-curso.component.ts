import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoAlumnoTutorService } from '../../../../service/curso-alumno-tutor.service';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { ToastrService } from 'ngx-toastr';
import { ActividadesCursoAlumnoTutorService } from 'src/app/tutor/service/actividades-curso-alumno-tutor.service';
import { CalificacionesVistaEstudianteService } from 'src/app/tutor/service/calificaciones-vista-estudiante.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-calendario-resumen-curso',
  templateUrl: './calendario-resumen-curso.component.html',
  styleUrls: ['./calendario-resumen-curso.component.css']
})
export class CalendarioResumenCursoComponent implements OnInit {
  ActividadesInfo: any = [];
  Tareas: any = [];
  idCurso: any;
  errorServicio: any = {};
  errorService: any = {
    codigoError: ''
  };
  
  absolvencia:any;

  Plugins: any = [dayGridPlugin, listPlugin];
  EventsDatos: any = [];
  Events: any = [];
  calendarOptions: CalendarOptions = {
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
    footerToolbar: {
      left: 'prev,next,today',
      center: '',
      right: 'dayGridMonth,dayGridWeek,listWeek',
    },
    eventTextColor: 'black',
  };

  sppinerOn: boolean = true;
  idEstudiante: string = '';
  calificacionesGet: any = [];
  calificacionIndividual: any = {
    idDetalleActividad: '',
    nombre_actividad: '',
    detalle: '',
    idTipoActividad: '',
    valor: '',
    idUnidad: '',
    nota: ''
  };
  foros: any = [];
  tareas: any = [];
  cantidad_foros: any = [];
  cantidad_tareas: any = [];
  colorprogress: any = [];
  suma: any = 0;

  listaRecursoCurso: any = [];
  RecursoIndividual: any = {
    idtbRecursoVideo: '',
    titulo: '',
    descripcion: '',
    fecha_creacion: '',
    idCurso: '',
    idUnidad: '',
    enlace: '',
    diponible: ''
  };

  listaAnuncioCurso: any = [];
  AnuncioIndividual: any = {
    idAnuncio: '',
    nombre_anuncio: '',
    anuncio: '',
    fecha_anuncio: '',
    idCurso: '',
    idUnidad: ''
  };

  alumnoGet: any = [];
  alumnoIndividual: any = {
    idAlumno: '',
    nombres_alumno: '',
    apellidos_alumno: ''
  };

  verNota: any = [];

  @Input() idCursoCurso: any = '';

  constructor(
    public ruta: ActivatedRoute,
    public calendario: CursoAlumnoTutorService,
    private actividadesCursoAlumnoTutorService: ActividadesCursoAlumnoTutorService,
    private toastrService: ToastrService,
    private calificacionesVistaEstudianteService: CalificacionesVistaEstudianteService
  ) { }

  ngOnInit(): void {
    this.VisibilidadNotasDireccion();
    this.getActividadesCurso();
    const params = this.ruta.snapshot.params;
    this.idEstudiante = params['idAlumno'];
    this.idCursoCurso = params['idCurso'];
    this.calificacionIndividual = this.calificacionesGet;
    this.getCalificacionesAlumno(this.idCursoCurso, this.idEstudiante);
    this.getRecursosPorGrado();
    this.getAnunciosPorGrado();
    this.obtenerDatosAlumno();
    this.alumnoIndividual = this.alumnoGet;
  }

  VisibilidadNotasDireccion(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.calificacionesVistaEstudianteService.getVisibilidadNotasTutor(idUsuario).subscribe(
      res=>{
        this.absolvencia = res[0].ver_notas;
      },
      err=>{
        this.errorServicio = err;
      }
    );
  }

  getActividadesCurso() {
    this.idCurso = this.ruta.snapshot.paramMap.get('idCurso');
    const idUsuario = this.idCurso;
    this.calendario.getActividadesCurso(idUsuario).subscribe(
      res => {
        this.ActividadesInfo = res;
        for (let i = 0; i < this.ActividadesInfo.length; i++) {
          this.EventsDatos[i] = {
            title: this.ActividadesInfo[i].nombre_actividad,
            date: this.ActividadesInfo[i].fecha_entrega,
            description: this.ActividadesInfo[i].detalle,
            color: this.ActividadesInfo[i].color_curso
          };
          this.Events = this.EventsDatos;
        }
      },
      err => {
        this.errorServicio = err;
      }
    );
  }

  obtenerDatosAlumno() {
    this.calificacionesVistaEstudianteService.getAlumno(this.idEstudiante).subscribe(
      res => {
        var cantidad = res.length;
        this.alumnoGet = res;
        for (let i = 0; i < cantidad; i++) {
          this.verNota = this.alumnoGet[i].ver_notas;
        }
      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }

  getCalificacionesAlumno(idCursoAc: string, idAlumnito: string) {
    var datoParaNota: any = {};
    datoParaNota.idCurso = idCursoAc;
    datoParaNota.idAlumno = idAlumnito;
    this.actividadesCursoAlumnoTutorService.getCalificacionesAlumno(idAlumnito, datoParaNota).subscribe(
      res => {
        this.sppinerOn = false;
        var cantidad = res.length;
        this.calificacionesGet = res;
        var AuxForos = 0;
        var AuxTareas = 0;

        for (let i = 0; i < cantidad; i++) {
          if (this.calificacionesGet[i].idTipoActividad == '1') {
            this.tareas[AuxTareas] = this.calificacionesGet[i];
            AuxTareas++;
            this.cantidad_tareas = this.tareas;
          } else {
            this.foros[AuxForos] = this.calificacionesGet[i];
            AuxForos++;
            this.cantidad_foros = this.foros;
          }
        }
        for (let i = 0; i < res.length; i++) {
          this.suma = res[i].nota + this.suma;
          if (this.suma > 100) {
            this.suma = 100;
          }
        }

        if (this.suma == 74 || this.suma < 74) {
          this.colorprogress = 'red';
        } else {
          if (this.suma == 75 || (this.suma > 75 && this.suma < 81)) {
            this.colorprogress = 'orange';
          } else {
            if (this.suma == 81 || (this.suma > 81 && this.suma < 91)) {
              this.colorprogress = 'gold';
            } else {
              if (this.suma > 90) {
                this.colorprogress = 'green';
              }
            }
          }
        }
      },
      error => {
        console.log('Error: ' + error);
        this.sppinerOn = false;
      }
    );
  }

  buscarActividadArray(idActividad: string) {
    this.calificacionIndividual = this.calificacionesGet.find((x: any) => x.idDetalleActividad === idActividad);
  }

  getRecursosPorGrado() {
    this.actividadesCursoAlumnoTutorService.getRecursosCurso(this.idCursoCurso).subscribe(
      res => {
        this.listaRecursoCurso = res;
        console.log(this.listaRecursoCurso);
      },
      err => {
        console.log(err);
      }
    );
  }

  buscarRecursoArray(idtbRecursoVideo: string) {
    this.RecursoIndividual = this.listaRecursoCurso.find((x: any) => x.idtbRecursoVideo === idtbRecursoVideo);
  }

  getAnunciosPorGrado() {
    this.actividadesCursoAlumnoTutorService.getAnunciosCurso(this.idCursoCurso).subscribe(
      res => {
        this.listaAnuncioCurso = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  buscarAnuncioArray(idAnuncio: string) {
    this.AnuncioIndividual = this.listaAnuncioCurso.find((x: any) => x.idAnuncio === idAnuncio);
  }
}

