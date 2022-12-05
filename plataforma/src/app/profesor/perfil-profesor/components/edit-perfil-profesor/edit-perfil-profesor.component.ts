import { Component, OnInit } from '@angular/core';
import { PerfilProfesorService } from '../../services/perfil-profesor.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-perfil-profesor',
  templateUrl: './edit-perfil-profesor.component.html',
  styleUrls: ['./edit-perfil-profesor.component.css']
})
export class EditPerfilProfesorComponent implements OnInit {

  constructor(private perfilProfesorService:PerfilProfesorService, private router:Router) { }

  pipe = new DatePipe('en-US');
  classBadgeActive:any;
  estado:any;
  permitirVer:any;
  profesorIndividual:any=[{
  }];

  ngOnInit(): void {
    this.perfilProfesorService.disparadorCopiarData.subscribe(data=>{
      this.profesorIndividual=Object.values(data);
      const fecha_nacimiento=this.profesorIndividual[0].fecha_nacimiento
      const split=fecha_nacimiento.split('/');
      const day=split[0];
      const mes=split[1];
      const ano=split[2];
      if(this.profesorIndividual[0].estatus==1){
        this.classBadgeActive='badge bg-success';
        this.estado="Activo"
      }else{
        this.classBadgeActive='badge bg-danger';
        this.estado="Inactivo"
      }
      this.profesorIndividual[0].fecha_nacimiento=ano+'-'+mes+'-'+day;
      this.permitirVer=this.profesorIndividual[0].permitir_ver_correo;
    });
  }
  selectedCheck(e:any){
    if(e.target.checked){
     this.permitirVer='1';
    }else{
     this.permitirVer='0';
    }
   }
   insertProfesor(idAdmin:string){
    delete this.profesorIndividual[0].creado
    delete this.profesorIndividual[0].idRol
    delete this.profesorIndividual[0].codigo
    this.profesorIndividual[0].permitir_ver_correo=this.permitirVer;
    this.perfilProfesorService.updateProfesor(this.profesorIndividual[0],idAdmin).subscribe(
      response=>{
        this.router.navigate(['/teacher/perfil']);
        if(this.profesorIndividual[0].estatus==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
        }
        this.permitirVer=this.profesorIndividual[0].permitir_ver_correo;
      },
      error=>{
        console.log(error)
      }
    )
  }

}
