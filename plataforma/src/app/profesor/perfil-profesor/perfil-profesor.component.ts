import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilProfesorService } from './services/perfil-profesor.service';
import { TemaProfesorService } from '../dashboard/services/tema-profesor.service';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:'',
    imagen:''
  };

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

  constructor(private perfilProfesoresService:PerfilProfesorService, private temaProfesorService:TemaProfesorService ) {}

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.perfilProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.perfilProfesoresService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.perfilProfesoresService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
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

  getEvent(e:any){
    this.profesorIndividual.nombre_profesor=e[0].nombre_profesor
    this.profesorIndividual.apellido_profesor=e[0].apellido_profesor
    this.profesorIndividual.imagen=e[0].imagen
  }
  getEvent2(e:any){
    this.profesorIndividual.imagen=e.imagen
  }
  getEvent3(e:any){
    console.log('asdasd')
  }

}
