import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ImagenesPerfilDefectoService } from '../../services/imagenes-perfil-defecto.service';

@Component({
  selector: 'app-admin-edit-perfil-admin',
  templateUrl: './edit-perfil-admin.component.html',
  styleUrls: ['./edit-perfil-admin.component.css']
})
export class EditPerfilAdminComponent implements OnInit {
  constructor(private perfilAdminService:PerfilService,private router:Router,private imagenPerfilService:ImagenesPerfilDefectoService) { }
  pipe = new DatePipe('en-US');
  imagenPerfilDefecto:any='assets/img/blank_profile.png'
  listaImagenes:any=[]
  imagenPerfilActual:any=''
  imagenPerfilNueva:any=''
  idCategoriaImagen:any
  classBadgeActive:any;
  estado:any;
  permitirVer:any;
  adminIndividual:any=[{
  }];
  @ViewChild('cerrarEditarModalPerfil') modalCloseEditar: any;
  @Output() datosEventoImagen=new EventEmitter<any>();
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
  ejecutarEventoActualizar(data:any){
    this.datosEventoImagen.emit(data);
  }
  actualizarImagenPerfil(idProfesor:string){
    if(this.imagenPerfilActual!=''){
      var imagenPerfil:any={
        imagen:this.imagenPerfilActual
      }
      this.perfilAdminService.updateAdmin(imagenPerfil,idProfesor).subscribe(
        res=>{
          this.ejecutarEventoActualizar(imagenPerfil)
          this.modalCloseEditar.nativeElement.click()
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
  eliminarFotoPerfil(){
    var imagenPerfil:any={
      imagen:this.imagenPerfilDefecto
    }
    console.log(this.adminIndividual[0].idProfesor)
    this.perfilAdminService.updateAdmin(imagenPerfil,this.adminIndividual[0].idProfesor).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }
  valueGetImagen(e:any){
    this.imagenPerfilActual=e
    this.adminIndividual[0].imagen=e
  }
  selectedCheck(e:any){
   if(e.target.checked){
    this.permitirVer='1';
   }else{
    this.permitirVer='0';
   }
  }
  getImagenesPerfil(idCategoria:string){
    this.imagenPerfilService.getImagenCategoria(idCategoria).subscribe(
      res=>{
        this.listaImagenes=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  selectValue(e:any){
    this.idCategoriaImagen=e.target.value
    this.getImagenesPerfil(e.target.value);
  }
  insertAdmin(idAdmin:string){
    delete this.adminIndividual[0].creado
    delete this.adminIndividual[0].idRol
    delete this.adminIndividual[0].codigo
    this.adminIndividual[0].permitir_ver_correo=this.permitirVer;
    this.perfilAdminService.updateAdmin(this.adminIndividual[0],idAdmin).subscribe(
      response=>{
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
