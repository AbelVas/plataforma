import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PerfilProfesorService } from '../../../services/perfil-profesor.service';
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

  //imagen de este coso de cambiar imagen de perfil
  imagenPerfilDefecto:any='assets/img/blank_profile.png'
  listaImagenes:any=[]
  imagenPerfilActual:any=''
  imagenPerfilNueva:any=''
  idCategoriaImagen:any
  @ViewChild('cerrarEditarModalPerfil') modalCloseEditar: any;
  @Output() datosEventoImagen=new EventEmitter<any>();
  //----------------------------------------

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

  //imagen de este coso de cambiar imagen de perfil
  ejecutarEventoActualizar(data:any){
    this.datosEventoImagen.emit(data);
  }
  actualizarImagenPerfil(idProfesor:string){
    if(this.imagenPerfilActual!=''){
      var imagenPerfil:any={
        imagen:this.imagenPerfilActual
      }
      this.perfilProfesorService.updateProfesor(imagenPerfil,idProfesor).subscribe(
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
    console.log(this.profesorIndividual[0].idProfesor)
    this.perfilProfesorService.updateProfesor(imagenPerfil,this.profesorIndividual[0].idProfesor).subscribe(
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
    this.profesorIndividual[0].imagen=e
  }

  getImagenesPerfil(idCategoria:string){
    this.perfilProfesorService.getImagenCategoria(idCategoria).subscribe(
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
//------------------------------------------

}
