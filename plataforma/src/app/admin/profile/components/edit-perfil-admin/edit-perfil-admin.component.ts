import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PerfilService } from '../../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ImagenesPerfilDefectoService } from '../../../services/imagenes-perfil-defecto.service';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import decode from "jwt-decode"
import { ToastrService } from 'ngx-toastr';
import { SubirImagenPerfilArchivoService } from 'src/app/admin/services/subir-imagen-perfil-archivo.service';


@Component({
  selector: 'app-admin-edit-perfil-admin',
  templateUrl: './edit-perfil-admin.component.html',
  styleUrls: ['./edit-perfil-admin.component.css']
})
export class EditPerfilAdminComponent implements OnInit {
  selectedFile: File | undefined;
  constructor(private fileUploadService: SubirImagenPerfilArchivoService,private perfilAdminService:PerfilService,private router:Router,private imagenPerfilService:ImagenesPerfilDefectoService,private formBuilder:FormBuilder, private toastrService:ToastrService) {
  }
  archivo:any="";
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
//NUEVO CONTROL PARA SUBIR IMAGENES
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
  uploadFile(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log('Archivo subido exitosamente', response);
        },
        error => {
          console.error('Error al subir el archivo', error);
        }
      );
    }
  }

  actualizarImgImport(event:Event){
    if (event!=null) {
      const imageBlob = this.archivo;
      const data = new FormData ();
      data.set('myfile',imageBlob)

      console.log(data)
      console.log(imageBlob)
      const {idUsuario}:any=decode(this.token);
        this.imagenPerfilService.subirDocImagenPerfil(idUsuario,data).subscribe(
          res=>{
            this.ejecutarEventoActualizar(imageBlob)
            this.modalCloseEditarImg.nativeElement.click()
            this.modalCloseEditar.nativeElement.click()
            this.toastrService.success("Completado", "Se ha subido el archivo")
          },
          err=>{
            this.ejecutarEventoActualizar(imageBlob)
            this.toastrService.error("Error", "No se ha logrado subir el archivo")
            console.log(err)
          }
        )

    }else{
      this.toastrService.error("Error", "No se ha logrado subir el archivo")
    }
    }
//Cambio sin nada
    subirArchivo(event:any) {
     if(event.target.files.length > 0){
      console.log("archivo")
      const file = event.target.files[0];
      const formData = new FormData()
      formData.append('myfile',file);
      const Doc = formData
      this.archivo = file;
      return file;
     }else{
      console.log("archivon't")
     return null;
     }
     

    }


    get f() { return this.EditarAdminForm.controls; }
  }

