import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from '../../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ImagenesPerfilDefectoService } from '../../../services/imagenes-perfil-defecto.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import decode from "jwt-decode"
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from 'src/app/web-socket.service';
import { UploadFotoPerfilService } from '../../../services/upload-foto-perfil.service';


@Component({
  selector: 'app-admin-edit-perfil-admin',
  templateUrl: './edit-perfil-admin.component.html',
  styleUrls: ['./edit-perfil-admin.component.css']
})
export class EditPerfilAdminComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  selectedFile: File | undefined;
  uploadedFilePath: any;
  uploadProgress: number | undefined;
  vistaPrevia: any
  anchoOriginal: number | undefined;
  altoOriginal: number | undefined;
  constructor(private imagenesPerfil: ImagenesPerfilDefectoService,private uploadFotoService:UploadFotoPerfilService,private socketService:WebSocketService,private perfilAdminService:PerfilService,private router:Router,private imagenPerfilService:ImagenesPerfilDefectoService,private formBuilder:FormBuilder, private toastrService:ToastrService) {
  }

  submitted=false;
  pipe = new DatePipe('en-US');
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
  imagenActiva:any
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

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
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
    this.getImagenPerfil(this.idUsuario);
     // En el componente o servicio del módulo profesor
     this.socketService.escucharEvento('actualizar-foto-ferfil-admin').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario);
        console.log("cambio desde socket coso de arriba")
        }
      });
  }
  getImagenPerfil(idAdmin:string) {
    this.imagenesPerfil.getFotoAdmin(idAdmin).subscribe(
      res=>{
        this.imagenActiva=res
        if(this.imagenActiva[0]?.ruta_imagen==undefined){
          this.adminIndividual[0].imagen='assets/img/perfiles/sinfoto/blank_profile.png'
        }else{
          this.adminIndividual[0].imagen=this.imagenActiva[0]?.ruta_imagen
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  onSubmit(form: HTMLFormElement) {
    const { idUsuario }: any = decode(this.token);
    const { idRol }: any = decode(this.token);
    const fileInput: HTMLInputElement | null = form.querySelector('#subirImagen');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      // Validar extensión del archivo
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension: any = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastrService.error('La extensión del archivo no es válida, únicamente se admiten: ' + allowedExtensions.join(', '), 'Error', { closeButton: true, timeOut: 0 });
        return; // Salir de la función si la extensión no es válida
      }
      // Validar peso del archivo
      const maxSizeInBytes: any = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSizeInBytes) {
        this.toastrService.error('El tamaño del archivo supera el límite permitido (10MB).', 'Error', { timeOut: 3000, extendedTimeOut: 10000 });
        return; // Salir de la función si el tamaño es mayor al límite
      }

 // Inicia el proceso de carga
 this.uploadFotoService.uploadFileWithProgress(file, idUsuario, idRol).subscribe(
  response => { // Maneja la respuesta del servidor

    if (typeof response === 'number'){
      if (response >= 0 && response <= 100) {
        this.uploadProgress = response;
      }
    }else if(typeof response === 'object' && response.filePath){
      const filePathFinal:any=response.filePath;

      this.imagenPerfilService.subidaDeImagen(idUsuario,filePathFinal,file.size).subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.log(err)
        }
      )
      // Realiza acciones adicionales con la respuesta del servidor si es necesario
      this.toastrService.success('El archivo:'+ file.name +'se ha subido correctamente.', 'Éxito', { timeOut: 3000 });
    }
  },
  error => { // Maneja los errores de la carga
    this.toastrService.error('Error al subir el archivo: '+error, 'Error', { timeOut: 3000 });
  }
);
    } else {
      // Mostrar un mensaje indicando que no se seleccionó ningún archivo
      this.toastrService.error('Por favor, selecciona un archivo para subir.', 'Error', { timeOut: 3000 });
    }
  }
  mostrarVistaPrevia(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    // Validar extensión del archivo
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          this.vistaPrevia = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
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
  getImagenesPerfilCategoriaDefecto(idCategoria:string){
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
    this.getImagenesPerfilCategoriaDefecto(e.target.value);
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

