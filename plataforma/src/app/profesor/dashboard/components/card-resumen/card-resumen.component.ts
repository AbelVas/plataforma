import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CardResumenService } from '../../services/card-resumen.service';

@Component({
  selector: 'app-card-resumen',
  templateUrl: './card-resumen.component.html',
  styleUrls: ['./card-resumen.component.css']
})
export class CardResumenComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  cursosGet:any=[];
  cursosIndividual:any={
    idCurso: ''
  };
  cantidad_cursos:any=[];
  gradosGet:any=[];
  gradosIndividual:any={
    idGrado:''
  };
  cantidad_grados:any=[];

  constructor(public cardResumenService:CardResumenService) { }

  ngOnInit(): void {
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet
    this.cardResumenService.disparadorCopiarData.emit(this.cursosIndividual);

    this.obtenerDatosGrados();
    this.gradosIndividual=this.gradosGet
    this.cardResumenService.disparadorCopiarData.emit(this.gradosIndividual);
  }

  obtenerDatosCursos(){
    const {idUsuario}:any=decode(this.token);
    this.cardResumenService.getCursoporProfesor(idUsuario).subscribe(
      response=>{
        this.cursosGet=response;
        this.cardResumenService.disparadorCopiarData.emit({
          data:this.cursosGet[0]
        });
        this.cantidad_cursos=response
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerDatosGrados(){
    const {idUsuario}:any=decode(this.token);
    this.cardResumenService.getGradoPorProfesor(idUsuario).subscribe(
      response=>{
        this.gradosGet=response;
        this.cardResumenService.disparadorCopiarData.emit({
          data:this.gradosGet[0]
        });
        this.cantidad_grados=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
