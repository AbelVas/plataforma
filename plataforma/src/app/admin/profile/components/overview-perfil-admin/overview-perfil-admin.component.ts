import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import decode from "jwt-decode"
import { PerfilService } from '../../../services/perfil.service';
import  {DatePipe} from "@angular/common"

@Component({
  selector: 'app-admin-overview-perfil-admin',
  templateUrl: './overview-perfil-admin.component.html',
  styleUrls: ['./overview-perfil-admin.component.css']
})
export class OverviewPerfilAdminComponent implements OnInit {
  sppinerOn:boolean=false;
  pipe = new DatePipe('en-US');
  token:any=localStorage.getItem('Acces-Token');
  errorServicio:any=[];
  estado:any;
  classBadgeActive:any;
  adminGet:any=[];
  adminIndividual:any={
    idProfesor: '',
    codigo:'',
    nombre_profesor:'',
    apellido_profesor:'',
    telefono:'',
    CUI:'',
    usuario:'',
    fecha_nacimiento:'',
    estatus:'',
    permitir_ver_correo:''
  };
  @Output() datosEvento=new EventEmitter<any>();
  constructor(private perfilAdminService:PerfilService) { }
  ngOnInit(): void {
    this.obtenerDatosAdmin();
    this.adminIndividual=this.adminGet
    this.perfilAdminService.disparadorCopiarData.emit(this.adminIndividual);
  }
  ejecutarEvento(data:any){
    this.datosEvento.emit(data);
  }
  obtenerDatosAdmin(){
    this.sppinerOn=true;
    const {idUsuario}:any=decode(this.token);
    this.perfilAdminService.getAdmin(idUsuario).subscribe(
      response=>{
        //console.log(response)
        this.adminGet=response;
        this.ejecutarEvento(this.adminGet);
        this.adminGet[0].fecha_nacimiento=this.pipe.transform((this.adminGet[0].fecha_nacimiento),'dd/MM/yyyy')
        this.perfilAdminService.disparadorCopiarData.emit({
          data:this.adminGet[0]
        });
        if(this.adminGet[0].estatus==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
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
