import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { GradoGuiaProfesorService } from './services/grado-guia-profesor.service';


@Component({
  selector: 'app-grado-guia-profesor',
  templateUrl: './grado-guia-profesor.component.html',
  styleUrls: ['./grado-guia-profesor.component.css']
})
export class GradoGuiaProfesorComponent implements OnInit {
  
  token:any=localStorage.getItem('Acces-Token');
  profesorGet:any=[];
  profesorIndividual:any={

  };
  listaalumnos:any=[]
  gradosGet:any=[]
  gradosSelecionado:any=''
  isSelected:any='0'
  profesorData:any=[]
  constructor( private gradoGuiaProfesorService:GradoGuiaProfesorService ) { }

  ngOnInit(): void {
    this.profesorData=this.profesorIndividual;

  }


  obtenerGradoGuia(idGrado:string){
    this.isSelected='1'
    const{idUsuario}:any=decode(this.token);
    this.gradoGuiaProfesorService.getGradoGuia(idGrado).subscribe(
      response=>{
        console.log(response);
        this.gradosGet=response;
        this.obtenerEstudiantesGuiaGrado(this.gradosGet[0].idGrado)
        //console.log(this.profesorIndividual)
      },
      error=>{
        console.log('Error: '+ error)
      }
    )
  }

  obtenerEstudiantesGuiaGrado(idGrado:string){
    this.gradoGuiaProfesorService.getEstudiantesGuiaGrado(idGrado).subscribe(
      response=>{
        this.listaalumnos=response;
      },
      error=>{
        console.log('Error: '+ error)
      }
    )
  }

  selectValue(e:any){
    this.gradosSelecionado=e.target.value
    console.log(this.gradosSelecionado)
    this.obtenerGradoGuia(this.gradosSelecionado)
  }
  obtenerGradoGuiaInicio(){
    const{idUsuario}:any=decode(this.token);
    this.gradoGuiaProfesorService.getGradoGuiaInicio(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.gradosGet=response;
        this.obtenerEstudiantesGuiaGrado(this.gradosGet[0].idGrado)
        //console.log(this.profesorIndividual)
      },
      error=>{
        console.log('Error: '+ error)
      }
    )
  }


}
