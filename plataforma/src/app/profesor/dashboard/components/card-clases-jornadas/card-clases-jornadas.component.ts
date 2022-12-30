import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CardResumenService } from '../../services/card-resumen.service';

@Component({
  selector: 'app-card-clases-jornadas',
  templateUrl: './card-clases-jornadas.component.html',
  styleUrls: ['./card-clases-jornadas.component.css']
})
export class CardClasesJornadasComponent implements OnInit {

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
