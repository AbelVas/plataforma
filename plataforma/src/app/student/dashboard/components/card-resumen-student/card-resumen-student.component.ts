import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { DahboardService } from '../../../services/dahboard.service';

@Component({
  selector: 'app-card-resumen-student',
  templateUrl: './card-resumen-student.component.html',
  styleUrls: ['./card-resumen-student.component.css']
})
export class CardResumenStudentComponent implements OnInit {
sppinerOn:boolean=true;
cantidadcursos:any=[];
Events:any=[];
CantidadActividades:any=[];
  constructor(public cardResumenStudent:DahboardService) { }

  ngOnInit(): void {
    this.obtenerDatosCursos();
    this.obtenerDatosActividades();
  }

  obtenerDatosCursos(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this. cardResumenStudent.getCursoparaAlumno(idUsuario).subscribe(
      response=>{
        this.cantidadcursos=response
        this.sppinerOn=false;
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

  ListaActividadesEventos:any=[];

  obtenerDatosActividades(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this. cardResumenStudent.getActividadesparaEventos(idUsuario).subscribe(
      response=>{
        this.ListaActividadesEventos=response
        },
      error=>{
        console.log('Error: '+error);
      }
    )
    }

  }
