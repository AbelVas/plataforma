import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerfilAlumnoService } from '../../../services/perfil-alumno.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import decode from "jwt-decode"
import { UploadFotoPerfilService } from 'src/app/upload-foto-perfil.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-edit-perfil-alumno',
  templateUrl: './edit-perfil-alumno.component.html',
  styleUrls: ['./edit-perfil-alumno.component.css']
})
export class EditPerfilAlumnoComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  selectedFile: File | undefined;
  uploadedFilePath: any;
  uploadProgress: number | undefined;
  vistaPrevia: any
  imagenActiva:any
  @ViewChild('uploadForm') uploadForm: ElementRef | undefined;
  constructor(private socketService:WebSocketService,private uploadFotoService:UploadFotoPerfilService,private perfilAlumnosService:PerfilAlumnoService, private router:Router, private toastrService:ToastrService, private formBuilder:FormBuilder) { }
  submitted=false;
  classBadgeActive:any;
  estado:any;
  alumnoIndividual:any=[{
  }];

      //Formulario editar Alumno
      EditarAlumnoForm=this.formBuilder.group({
        nombres_alumno:new FormControl('',[Validators.required]),
        apellidos_alumno:new FormControl('',[Validators.required]),
      })

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol=decodedToken.idRol
    this.perfilAlumnosService.disparadorCopiarData.subscribe(data=>{
      this.alumnoIndividual=Object.values(data);
      if(this.alumnoIndividual[0].activo==1){
        this.classBadgeActive='badge bg-success';
        this.estado="Activo"
      }else{
        this.classBadgeActive='badge bg-danger';
        this.estado="Inactivo"
      }
      this.alumnoIndividual[0];
    });
    this.getImagenPerfil(this.idUsuario);
    //coso de socket
    this.socketService.escucharEvento('actualizar-foto-ferfil-alumno').subscribe((data: any) => {
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
 this.uploadFotoService.uploadFileWithProgress(file, this.idUsuario, this.idRol).subscribe(
  response => { // Maneja la respuesta del servidor

    if (typeof response === 'number'){
      if (response >= 0 && response <= 100) {
        this.uploadProgress = response;
      }
    }else if(typeof response === 'object' && response.filePath){
      const filePathFinal:any=response.filePath;

      this.perfilAlumnosService.subidaDeImagen(this.idUsuario,filePathFinal,file.size).subscribe(
        res=>{
          this.alumnoIndividual[0].imagen=filePathFinal
          console.log(res)
        },
        err=>{
          console.log(err)
        }
      )
      // Realiza acciones adicionales con la respuesta del servidor si es necesario
      this.toastrService.success('El archivo: "'+ file.name +'" se ha subido correctamente.', 'Éxito', { timeOut: 3000 });
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
  getImagenPerfil(idAlumno:string) {
    this.perfilAlumnosService.getFotoALUMNO(idAlumno).subscribe(
      res=>{
        this.imagenActiva=res
        if(this.imagenActiva[0]?.ruta_imagen==undefined){
          this.alumnoIndividual[0].imagen='assets/img/perfiles/sinfoto/blank_profile.png'
        }else{
          this.alumnoIndividual[0].imagen=this.imagenActiva[0]?.ruta_imagen
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  //esto es para validar que un campo no se vaya vacio si es importante
  get f() { return this.EditarAlumnoForm.controls; }
  insertAlumno(idAlumno:string){
    this.submitted=true;
    if (this.EditarAlumnoForm.invalid) {
      this.toastrService.error(`Falta información`,'Error')
      return;
    }
    this.perfilAlumnosService.updateAlumno(this.EditarAlumnoForm.value,idAlumno).subscribe(
      response=>{
        this.router.navigate(['/student/perfil']);
        if(this.alumnoIndividual[0].activo==1){
          this.classBadgeActive='badge bg-success';
          this.estado="Activo"
        }else{
          this.classBadgeActive='badge bg-danger';
          this.estado="Inactivo"
        }
        this.toastrService.success(`Pefil Actualizado`,'Realizado')
      },
      error=>{
        console.log(error)
        this.toastrService.error(`Perfil no Actualizado`,'Error')
      }
    )
  }
}
