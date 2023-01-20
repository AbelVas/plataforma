import { Component, OnInit } from '@angular/core';
import { TemaProfesorService } from '../services/tema-profesor.service';
import decode from "jwt-decode"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
    fondo2: '',
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
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
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
