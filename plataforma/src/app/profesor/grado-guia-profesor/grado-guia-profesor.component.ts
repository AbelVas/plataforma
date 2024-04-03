import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { GradoGuiaProfesorService } from '../services/grado-guia-profesor.service';
import { TemaProfesorService } from '../services/tema-profesor.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-grado-guia-profesor',
  templateUrl: './grado-guia-profesor.component.html',
  styleUrls: ['./grado-guia-profesor.component.css']
})
export class GradoGuiaProfesorComponent implements OnInit {
  sppinerOn:boolean=true;
  idProfesor:string='';
  Nombre_profesor:string='';
  Apellido_profesor:string='';

  idGradoCurso:string='';
  gradoguiaGet:any=[];
  gradoguiaIndividual:any={
    idGuias:'',
    idGrado:'',
    nombre_grado:'',
    seccion:'',
    jornada:'',
    nivel:''
  }

  temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    fondo1: '',
    fondo2: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor(private socketService:WebSocketService,private gradoGuiaProfesorService:GradoGuiaProfesorService, private temaProfesorService:TemaProfesorService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario,nombre_profesor,apellido_profesor}:any=decode(token);
    this.idProfesor=idUsuario;
    this.Nombre_profesor=nombre_profesor;
    this.Apellido_profesor=apellido_profesor

    this.obtenerGradoGuia();

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerGradoGuia(iddelProfesor=this.idProfesor){
    this.gradoGuiaProfesorService.getGradoGuiaProfesor(iddelProfesor).subscribe(
      response=>{
        this.gradoguiaGet=response;
        this.sppinerOn=false;
      }
    )
  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
