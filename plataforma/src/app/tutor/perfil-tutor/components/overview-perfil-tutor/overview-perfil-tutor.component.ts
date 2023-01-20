import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilTutorService } from '../../../service/perfil-tutor.service';
import  {DatePipe} from "@angular/common";

@Component({
  selector: 'app-overview-perfil-tutor',
  templateUrl: './overview-perfil-tutor.component.html',
  styleUrls: ['./overview-perfil-tutor.component.css']
})
export class OverviewPerfilTutorComponent implements OnInit {
  sppinerOn:boolean=true;
  pipe = new DatePipe('en-US');
  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  tutorGet:any=[];
  tutorIndividual:any={
    idTutor:'',
    nombre_tutor:'',
    apellido_tutor:'',
    telefono1:'',
    telefono2:'',
    telefono_casa:'',
    direccion:'',
    usuario:'',
    fecha_nacimiento:'',
    estado:'',
    correo1:'',
    correo2:''
  }

  constructor( private perfilTutoresService:PerfilTutorService ) { }

  ngOnInit(): void {
    this.obtenerDatosTutor();
    this.tutorIndividual=this.tutorGet
    this.perfilTutoresService.disparadorCopiarData.emit(this.tutorIndividual);
  }

  obtenerDatosTutor(){
    const {idUsuario}:any=decode(this.token);
    this.perfilTutoresService.getTutor(idUsuario).subscribe(
      response=>{
        this.tutorGet=response;
        this.tutorGet[0].fecha_nacimiento=this.pipe.transform((this.tutorGet[0].fecha_nacimiento),'dd/MM/yyyy')
        this.perfilTutoresService.disparadorCopiarData.emit({
          data:this.tutorGet[0]
        });
        if(this.tutorGet[0].estado==1){
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
