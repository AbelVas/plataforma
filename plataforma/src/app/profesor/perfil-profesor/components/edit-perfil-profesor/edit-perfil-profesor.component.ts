import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PerfilProfesorService } from '../../../services/perfil-profesor.service';
import  {DatePipe} from "@angular/common"
import { Router } from "@angular/router";
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import decode from "jwt-decode"
import { UploadFotoPerfilService } from 'src/app/upload-foto-perfil.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { ImagenesPerfilDefectoService } from 'src/app/admin/services/imagenes-perfil-defecto.service';
@Component({
  selector: 'app-edit-perfil-profesor',
  templateUrl: './edit-perfil-profesor.component.html',
  styleUrls: ['./edit-perfil-profesor.component.css']
})
export class EditPerfilProfesorComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  selectedFile: File | undefined;
  uploadedFilePath: any;
  uploadProgress: number | undefined;
  vistaPrevia: any
  imagenActiva:any
  categoriaImagen:any=[]
  imagenSubidaUsuario:any=[]
  constructor(private perfildesdeadmin:ImagenesPerfilDefectoService,private uploadFotoService:UploadFotoPerfilService,private socketService:WebSocketService,private perfilProfesorService:PerfilProfesorService, private router:Router,private formBuilder:FormBuilder, private toastrService:ToastrService) { }
  submitted=false;
  pipe = new DatePipe('en-US');
  classBadgeActive:any;
  estado:any;
  permitirVer:any;
  profesorIndividual:any=[{
  }];

  EditarProfesorForm=this.formBuilder.group({
    nombre_profesor:new FormControl('',[Validators.required]),
    apellido_profesor:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    CUI:new FormControl('',[Validators.required]),
    fecha_nacimiento:new FormControl('',[Validators.required]),
    permitir_ver_correo:new FormControl(''),
    correo1:new FormControl(''),
    correo2:new FormControl(''),
  })

  //imagen de este coso de cambiar imagen de perfil
  listaImagenes:any=[]
  imagenPerfilActual:any=''
  imagenPerfilNueva:any=''
  idCategoriaImagen:any
  @ViewChild('cerrarEditarModalPerfil') modalCloseEditar: any;
  @Output() datosEventoImagen=new EventEmitter<any>();
  //----------------------------------------
  @ViewChild('uploadForm') uploadForm: ElementRef | undefined;
  ngOnInit(): void {
    this.getCategoriasDeImagenesDePerfil()
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol=decodedToken.idRol
    //fin saco la data del token
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
    this.getImagenPerfil(this.idUsuario);
    //coso de socket
    this.socketService.escucharEvento('actualizar-foto-ferfil-docente').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario);
        }
    });
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
      // Inicia el proceso de carga
      this.uploadFotoService.uploadFileWithProgress(file, idUsuario, idRol,'foto-perfil-usuario').subscribe(
        response => { // Maneja la respuesta del servidor

          if (typeof response === 'number'){
            if (response >= 0 && response <= 100) {
              this.uploadProgress = response;
            }
          }else if(typeof response === 'object' && response.filePath){
            const filePathFinal:any=response.filePath;

            this.perfilProfesorService.subidaDeImagen(idUsuario,filePathFinal,file.size,this.idRol).subscribe(
              res=>{
                this.profesorIndividual[0].imagen=filePathFinal
              },
              err=>{
                this.toastrService.error('Error al subir el archivo: ' + err.message, 'Error', { timeOut: 10000 });
              }
            )
              // Realiza acciones adicionales con la respuesta del servidor si es necesario
              this.toastrService.success('El archivo: "'+ file.name +'" se ha subido correctamente.', 'Éxito', { timeOut: 10000 });
          }
      },
      error => { // Maneja los errores de la carga
        this.toastrService.error('Error al subir el archivo: '+error, 'Error', { timeOut: 10000 });
      });
    } else {
      // Mostrar un mensaje indicando que no se seleccionó ningún archivo
      this.toastrService.error('Por favor, selecciona un archivo para subir.', 'Error', { timeOut: 10000 });
    }
  }
  getImagenPerfil(idAdmin:string) {
    this.perfilProfesorService.getFotoPROFE(idAdmin).subscribe(
      res=>{
        this.imagenActiva=res
        if(this.imagenActiva[0]?.ruta_imagen==undefined){
          this.profesorIndividual[0].imagen='assets/img/perfiles/sinfoto/blank_profile.png'
        }else{
          this.profesorIndividual[0].imagen=this.imagenActiva[0]?.ruta_imagen
        }
      },
      err=>{
        console.log(err)
      }
    )
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
   insertProfesor(idAdmin:string){
    this.submitted=true;
    if (this.EditarProfesorForm.invalid) {
      this.toastrService.error(`Falta información`,'Error',{disableTimeOut:true})
      return;
    }
    this.EditarProfesorForm.value.permitir_ver_correo=this.permitirVer;
    this.perfilProfesorService.updateProfesor(this.EditarProfesorForm.value,idAdmin).subscribe(
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
        this.toastrService.success(`Pefil Actualizado`,'Realizado')
      },
      error=>{
        console.log(error)
        this.toastrService.error(`Perfil no Actualizado`,'Error')
      }
    )
  }
  valueGetImagen(e:any){
    this.imagenPerfilActual=e
  }
  getCategoriasDeImagenesDePerfil(){
    this.perfilProfesorService.getCategoriasImagenes().subscribe(
      res=>{
        this.categoriaImagen=res
      },err=>{
        console.log(err)
      }
    )
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
    if(this.idCategoriaImagen=='1'){
      this.perfildesdeadmin.getImagenesSubidasPorUsuarioProfesor(this.idUsuario).subscribe(
        res=>{
          this.imagenSubidaUsuario=res
        },
        err=>{
          console.log(err)
        }
      )
    }else{
      this.getImagenesPerfil(e.target.value);
    }
  }
  actualizarImagenPerfilSeleccionada(){
    const ruta_imagen=this.imagenPerfilActual
    var idCategoria=this.idCategoriaImagen
    if(idCategoria!=1){
      this.perfildesdeadmin.actualizarImagenPerfilProfesor(this.idUsuario,ruta_imagen,"0",this.idRol).subscribe(
        res=>{
          this.profesorIndividual[0].imagen=ruta_imagen
        },
        err=>{
          console.log(err)
        }
      )
    }else if(idCategoria==1){
      this.perfildesdeadmin.actualizarImagenPerfilProfesor(this.idUsuario,ruta_imagen,"1",this.idRol).subscribe(
        res=>{
          this.profesorIndividual[0].imagen=ruta_imagen
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
//esto es para validar que un campo no se vaya vacio si es importante
get f() { return this.EditarProfesorForm.controls; }

}

