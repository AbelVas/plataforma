import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilTutorService } from '../service/perfil-tutor.service';
import { TematutoresService } from '../service/tematutores.service';

@Component({
  selector: 'app-perfil-tutor',
  templateUrl: './perfil-tutor.component.html',
  styleUrls: ['./perfil-tutor.component.css']
})
export class PerfilTutorComponent implements OnInit {
  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  tutorGet:any=[];
  tutorIndividual:any={
    idTutor: '',
    nombre_tutor:'',
    apellido_tutor:''
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
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  ctexto1:string='';

  constructor( private perfilTutoresService:PerfilTutorService, private tematutoresService:TematutoresService) { }

  ngOnInit(): void {
    this.obtenerDatosTutor();
    this.tutorIndividual=this.tutorGet
    this.perfilTutoresService.disparadorCopiarData.emit(this.tutorIndividual);

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosTutor(){
    const {idUsuario}:any=decode(this.token);
    this.perfilTutoresService.getTutor(idUsuario).subscribe(
      response=>{
        this.tutorGet=response;
        this.perfilTutoresService.disparadorCopiarData.emit({
          data:this.tutorGet[0]
        })
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerDatosTema(){
    this.tematutoresService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
