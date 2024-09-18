import { Component, OnInit, Input } from '@angular/core';
import decode from 'jwt-decode';
import { DashboardService } from '../../../service/dashboard.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './card-resumen.component.html',
  styleUrls: ['./card-resumen.component.css']
})
export class CardResumenComponent implements OnInit {
  sppinerOn:boolean=true;
  idTutorPrincipal:string='';
  Nombre_profesor:string='';

  alumnosGet:any=[];
  alumnoIndividual:any={
    idAlumno: '',
    nombres_alumno: '',
    apellidos_alumno: '',
    sexo: '',
    usuario: '',
    nombre_grado:'',
    seccion:'',
    codigo:''
  };

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  constructor(private dashboardService:DashboardService,private socketService: WebSocketService,private toastrService: ToastrService,) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {nombre_profesor, idUsuario}:any=decode(token);
    this.Nombre_profesor=nombre_profesor;
    this.idTutorPrincipal=idUsuario;
    this.obtenerDatosAlumnos();
    this.alumnoIndividual=this.alumnosGet

    this.socketService.escucharEvento('acciones-vinculacion-tutor').subscribe((data: any) => {
      const toastMethod = data.titulo.includes('Eliminado') ? 'warning' : 'success';
      this.toastrService[toastMethod](data.mensaje, data.titulo);
      this.obtenerDatosAlumnos();
    });
  }

  obtenerDatosAlumnos(){
    this.dashboardService.getAlumnosdelTutor(this.idTutorPrincipal).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

}
