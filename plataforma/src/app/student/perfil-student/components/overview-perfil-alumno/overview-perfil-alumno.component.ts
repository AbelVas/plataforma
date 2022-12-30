import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilAlumnoService } from '../../services/perfil-alumno.service';
import  {DatePipe} from "@angular/common";

@Component({
  selector: 'app-overview-perfil-alumno',
  templateUrl: './overview-perfil-alumno.component.html',
  styleUrls: ['./overview-perfil-alumno.component.css']
})
export class OverviewPerfilAlumnoComponent implements OnInit {
  sppinerOn:boolean=true;
  pipe = new DatePipe('en-US');
  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  alumnoGet:any=[];
  alumnoIndividual:any={
    idAlumno:'',
    nombres_alumno:'',
    apellidos_alumno:'',
    usuario:'',
    activo:''
  }

  constructor( private perfilAlumnosService:PerfilAlumnoService) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.alumnoIndividual=this.alumnoGet;
    this.perfilAlumnosService.disparadorCopiarData.emit(this.alumnoIndividual);
  }

  obtenerDatosAlumno(){
    const {idUsuario}:any=decode(this.token);
    this.perfilAlumnosService.getAlumno(idUsuario).subscribe(
      response=>{
        this.alumnoGet=response;
        this.perfilAlumnosService.disparadorCopiarData.emit({
          data:this.alumnoGet[0]
        });
        if(this.alumnoGet[0].activo==1){
          this.classBadgeActive='badge bg-success';
          this.estado='Activo';
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado='Inactivado';
        }
        this.sppinerOn=false;
      },
      error=>{
        this.sppinerOn=false;
        console.log('Error: '+error);
      }
    )
  }

}
