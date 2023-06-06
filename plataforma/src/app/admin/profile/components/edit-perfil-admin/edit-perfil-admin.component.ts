import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PerfilService } from '../../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ImagenesPerfilDefectoService } from '../../../services/imagenes-perfil-defecto.service';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import decode from "jwt-decode"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-perfil-admin',
  templateUrl: './edit-perfil-admin.component.html',
  styleUrls: ['./edit-perfil-admin.component.css']
})
export class EditPerfilAdminComponent implements OnInit {
  constructor(private perfilAdminService:PerfilService,private router:Router,private imagenPerfilService:ImagenesPerfilDefectoService,private formBuilder:FormBuilder, private toastrService:ToastrService) { }
  submitted=false;
  pipe = new DatePipe('en-US');
  token:any=localStorage.getItem('Acces-Token');
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

  ImgForm=this.formBuilder.group({
    archivoImagen:new FormControl(null,[Validators.required]),
  })

  EditarAdminForm=this.formBuilder.group({
    nombre_profesor:new FormControl('',[Validators.required]),
    apellido_profesor:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    CUI:new FormControl('',[Validators.required]),
    fecha_nacimiento:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    permitir_ver_correo:new FormControl(''),
  })

  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarEditarModal') modalCloseEditarImg: any;
  @ViewChild('cerrarEditarModalPerfil') modalCloseEditar: any;

  @ViewChild('subirImagen', { static: false }) subirImagen!: ElementRef;

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
    this.submitted=true;
    if (this.EditarAdminForm.invalid) {
      this.toastrService.error(`Falta información`,'Error')
      return;
    }
    this.EditarAdminForm.value.permitir_ver_correo=this.permitirVer;
    this.perfilAdminService.updateAdmin(this.EditarAdminForm.value,idAdmin).subscribe(
      response=>{
        if(this.adminIndividual[0].estatus==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
        }
        this.permitirVer=this.adminIndividual[0].permitir_ver_correo;
        this.toastrService.success(`Pefil Actualizado`,'Realizado')
      },
      error=>{
        console.log(error)
        this.toastrService.error(`Perfil no Actualizado`,'Error')
      }
    )
  }
    get f() { return this.EditarAdminForm.controls; }
  }

