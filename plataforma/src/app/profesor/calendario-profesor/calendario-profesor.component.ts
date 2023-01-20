import { Component, OnInit } from '@angular/core';
import decode from "jwt-decode"
import { TemaProfesorService } from '../services/tema-profesor.service';

@Component({
  selector: 'app-calendario-profesor',
  templateUrl: './calendario-profesor.component.html',
  styleUrls: ['./calendario-profesor.component.css']
})

export class CalendarioProfesorComponent implements OnInit {

  Usuario:string='';
  Nombre_profesor:string='';
  Rol:string='';
  Apellido_profesor:string='';

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

  constructor( private temaProfesorService:TemaProfesorService ) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {usuario,nombre_profesor,rol,apellido_profesor}:any=decode(token);
    this.Usuario=usuario;
    this.Nombre_profesor=nombre_profesor;
    this.Rol=rol
    this.Apellido_profesor=apellido_profesor

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
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
