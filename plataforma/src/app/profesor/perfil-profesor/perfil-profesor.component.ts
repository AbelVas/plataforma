import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilProfesorService } from './services/perfil-profesor.service';

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
    apellido_profesor:''
  };

  constructor(private perfilProfesoresService:PerfilProfesorService) {}

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.perfilProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);
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

}
