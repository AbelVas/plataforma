import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilTutorService } from './services/perfil-tutor.service';

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

  constructor( private perfilTutoresService:PerfilTutorService) { }

  ngOnInit(): void {
    this.obtenerDatosTutor();
    this.tutorIndividual=this.tutorGet
    this.perfilTutoresService.disparadorCopiarData.emit(this.tutorIndividual);
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

}
