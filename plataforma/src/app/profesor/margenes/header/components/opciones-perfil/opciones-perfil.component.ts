import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { MargenesProfesorService } from '../../../services/margenes-profesor.service';

@Component({
  selector: 'app-teacher-opciones-nav-perfil',
  templateUrl: './opciones-perfil.component.html',
  styleUrls: ['./opciones-perfil.component.css']
})
export class OpcionesPerfilComponent implements OnInit {

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

  constructor(private margenesProfesoresService:MargenesProfesorService) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.margenesProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.margenesProfesoresService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.margenesProfesoresService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
