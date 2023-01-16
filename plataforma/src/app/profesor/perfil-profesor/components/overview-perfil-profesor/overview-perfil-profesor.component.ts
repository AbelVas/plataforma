import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import decode from 'jwt-decode';
import { PerfilProfesorService } from '../../services/perfil-profesor.service';
import  {DatePipe} from "@angular/common";

@Component({
  selector: 'app-overview-perfil-profesor',
  templateUrl: './overview-perfil-profesor.component.html',
  styleUrls: ['./overview-perfil-profesor.component.css']
})
export class OverviewPerfilProfesorComponent implements OnInit {
  sppinerOn:boolean=true;
  pipe = new DatePipe('en-US');
  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  profesorGet:any=[];
  profesorIndividual:any={
    idProfesor: '',
    codigo:'',
    nombre_profesor:'',
    apellido_profesor:'',
    telefono:'',
    CUI:'',
    usuario:'',
    fecha_nacimiento:'',
    estatus:'',
    permitir_ver_correo:'',
    correo1:'',
    correo2:'',
    imagen:''
  };
  @Output() datoEvento=new EventEmitter<any>();
  constructor(private perfilProfesoresService:PerfilProfesorService) { }

  ngOnInit(): void {
    this.obtenerDatosProfesor();
    this.profesorIndividual=this.profesorGet
    this.perfilProfesoresService.disparadorCopiarData.emit(this.profesorIndividual);
  }
  ejecutarEvento(data:any){
    this.datoEvento.emit(data);
  }
  obtenerDatosProfesor(){
    const {idUsuario}:any=decode(this.token);
    this.perfilProfesoresService.getProfesor(idUsuario).subscribe(
      response=>{
        this.sppinerOn=false;
        this.ejecutarEvento(this.profesorGet);
        this.profesorGet=response;
        this.profesorGet[0].fecha_nacimiento=this.pipe.transform((this.profesorGet[0].fecha_nacimiento),'dd/MM/yyyy')
        this.perfilProfesoresService.disparadorCopiarData.emit({
          data:this.profesorGet[0]
        });
        if(this.profesorGet[0].estatus==1){
          this.classBadgeActive='badge bg-success';
          this.estado='Activo';
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado='Inactivado';
        }
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }
}
