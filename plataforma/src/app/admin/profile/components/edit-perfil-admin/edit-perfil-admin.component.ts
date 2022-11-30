import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-edit-perfil-admin',
  templateUrl: './edit-perfil-admin.component.html',
  styleUrls: ['./edit-perfil-admin.component.css']
})
export class EditPerfilAdminComponent implements OnInit {
  constructor(private perfilAdminService:PerfilService,private router:Router) { }
  pipe = new DatePipe('en-US');
  classBadgeActive:any;
  estado:any;
  permitirVer:any;
  adminIndividual:any=[{
  }];
  ngOnInit(): void {
    this.perfilAdminService.disparadorCopiarData.subscribe(data=>{
    this.adminIndividual=Object.values(data);
    const fecha_nacimiento=this.adminIndividual[0].fecha_nacimiento
    const split=fecha_nacimiento.split('/');
    const day=split[0];
    const mes=split[1];
    const ano=split[2];
    if(this.adminIndividual[0].estatus==1){
      this.classBadgeActive='badge bg-success';
      this.estado="Activo"
    }else{
      this.classBadgeActive='badge bg-danger';
      this.estado="Inactivo"
    }
    this.adminIndividual[0].fecha_nacimiento=ano+'-'+mes+'-'+day;
    this.permitirVer=this.adminIndividual[0].permitir_ver_correo;
    });
  }
  selectedCheck(e:any){
   if(e.target.checked){
    this.permitirVer='1';
   }else{
    this.permitirVer='0';
   }
  }
  insertAdmin(idAdmin:string){
    delete this.adminIndividual[0].creado
    delete this.adminIndividual[0].idRol
    this.adminIndividual[0].permitir_ver_correo=this.permitirVer;
    this.perfilAdminService.updateAdmin(this.adminIndividual[0],idAdmin).subscribe(
      response=>{
        this.router.navigate(['/admin/perfil']);
        if(this.adminIndividual[0].estatus==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
        }
        this.permitirVer=this.adminIndividual[0].permitir_ver_correo;
      },
      error=>{
        console.log(error)
      }
    )
  }
}
