import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CardResumenService } from '../dashboard/services/card-resumen.service';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.component.html',
  styleUrls: ['./cursos-profesor.component.css']
})
export class CursosProfesorComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso: '',
    nombre_grado:'',
    nivel:'',
    idJornada:'',
    seccion:'',
    jornada:'',
    nombre_curso:''
  };

  constructor( public cardResumenService:CardResumenService ) { }

  ngOnInit(): void {
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet
    this.cardResumenService.disparadorCopiarData.emit(this.cursosIndividual);
  }

  obtenerDatosCursos(){
    const {idUsuario}:any=decode(this.token);
    this.cardResumenService.getCursoporProfesor(idUsuario).subscribe(
      response=>{
        this.cursosGet=response;
        this.cardResumenService.disparadorCopiarData.emit({
          data:this.cursosGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
