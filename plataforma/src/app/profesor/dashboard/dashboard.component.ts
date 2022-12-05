import { Component, OnInit, ElementRef } from '@angular/core';
import decode from 'jwt-decode';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  token:any=localStorage.getItem('Acces-Token');
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    nombre_profesor:'',
    apellido_profesor:''
  };

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.dashboardService.disparadorCopiarData.emit(this.profesorIndividual);
  }

  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.dashboardService.getProfesor(idUsuario).subscribe(
      response=>{
        this.profesorGet=response;
        this.dashboardService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
