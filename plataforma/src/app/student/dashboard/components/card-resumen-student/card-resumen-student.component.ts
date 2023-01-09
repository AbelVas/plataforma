import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { DahboardService } from '../../services/dahboard.service';

@Component({
  selector: 'app-card-resumen-student',
  templateUrl: './card-resumen-student.component.html',
  styleUrls: ['./card-resumen-student.component.css']
})
export class CardResumenStudentComponent implements OnInit {
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
      },
      error=>{
        console.log('Error: '+error);
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
        //console.log(this.EventsDatos[4].date='2023-01-21');
        //this.EventsDatos[4].date='2023-01-03
      error=>{
        console.log('Error: '+error);
      }
    )
    }

  }
