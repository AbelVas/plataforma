import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from '../../../services/perfil.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { ImagenesPerfilDefectoService } from '../../../services/imagenes-perfil-defecto.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import decode from "jwt-decode"
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from 'src/app/web-socket.service';
import { UploadFotoPerfilService } from '../../../../upload-foto-perfil.service';


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

  categoriaImagen:any=[]
  imagenSubidaUsuario:any=[]
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
  @ViewChild('uploadForm') uploadForm: ElementRef | undefined;
  ngOnInit(): void {
    this.getCategoriasDeImagenesDePerfil();
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    this.perfilAdminService.disparadorCopiarData.subscribe(data=>{
    this.adminIndividual=Object.values(data);

    if(this.adminIndividual[0].estatus==1){
      this.classBadgeActive='badge bg-success';
      this.estado="Activo"
    }else{
      this.classBadgeActive='badge bg-danger';
      this.estado="Inactivo"
    }
    this.permitirVer=this.adminIndividual[0].permitir_ver_correo;
    });
    this.getImagenPerfil(this.idUsuario);
     // En el componente o servicio del módulo profesor
     this.socketService.escucharEvento('actualizar-foto-perfil-admin').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario);
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
  reiniciarModal() {
    if (this.uploadForm) {
      // Obtener el formulario y restablecer sus valores
      const form: any = this.uploadForm.nativeElement;
      form.reset();
      this.vistaPrevia = ''; // Limpiar la vista previa de la imagen si la tienes
      this.uploadProgress = undefined; // Reiniciar el progreso de la barra
    } else {
      console.error('Error: uploadForm is undefined.'); // Opcional: Mostrar un mensaje de error si uploadForm es undefined
    }
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

            this.imagenPerfilService.subidaDeImagen(idUsuario,filePathFinal,file.size,this.idRol).subscribe(
              res=>{
                this.adminIndividual[0].imagen=filePathFinal
              },
              err=>{
                console.log(err)
              }
            )
            // Realiza acciones adicionales con la respuesta del servidor si es necesario
            this.toastrService.success('El archivo: "'+ file.name +'" se ha subido correctamente.', 'Éxito', { timeOut: 3000 });
            this.getImagenPerfil(idUsuario)
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
  selectedCheck(e:any){
   if(e.target.checked){
    this.permitirVer='1';
   }else{
    this.permitirVer='0';
   }
  }
  getCategoriasDeImagenesDePerfil(){
    this.imagenesPerfil.getCategoriasImagenes().subscribe(
      res=>{
        this.categoriaImagen=res
      },err=>{
        console.log(err)
      }
    )
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
  valueGetImagen(e:any){
    this.imagenPerfilActual=e
    //this.adminIndividual[0].imagen=e <- OJO ACA, ES PARAA LA IMAGEN POR DEFECTO
  }
  selectValue(e:any){
    this.idCategoriaImagen=e.target.value
    if(this.idCategoriaImagen=='1'){
      this.imagenesPerfil.getImagenesSubidasPorUsuarioProfesor(this.idUsuario).subscribe(
        res=>{
          this.imagenSubidaUsuario=res
        },
        err=>{
          console.log(err)
        }
      )
    }else{
      this.getImagenesPerfilCategoriaDefecto(e.target.value);
    }
  }
  actualizarImagenPerfilSeleccionada(){
    const ruta_imagen=this.imagenPerfilActual
    var idCategoria=this.idCategoriaImagen
    if(idCategoria!=1){
      this.imagenesPerfil.actualizarImagenPerfilProfesor(this.idUsuario,ruta_imagen,"0",this.idRol).subscribe(
        res=>{
          this.adminIndividual[0].imagen=ruta_imagen
        },
        err=>{
          console.log(err)
        }
      )
    }else if(idCategoria==1){
      this.imagenesPerfil.actualizarImagenPerfilProfesor(this.idUsuario,ruta_imagen,"1",this.idRol).subscribe(
        res=>{
          this.adminIndividual[0].imagen=ruta_imagen
        },
        err=>{
          console.log(err)
        }
      )
    }
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

