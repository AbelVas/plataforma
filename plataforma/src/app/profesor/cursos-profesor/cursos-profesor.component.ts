import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from '../services/card-resumen.service';
import { TemaProfesorService } from '../services/tema-profesor.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import decode from "jwt-decode"
import { UploadFotoPerfilService } from 'src/app/upload-foto-perfil.service';
import { PerfilProfesorService } from '../services/perfil-profesor.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.component.html',
  styleUrls: ['./cursos-profesor.component.css']
})
export class CursosProfesorComponent implements OnInit {
  //Subida de imagenes
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;
  idRol: any;
  selectedFile: File | undefined;
  uploadedFilePath: any;
  uploadProgress: number | undefined;
  vistaPrevia: any

  categoriaImagen:any=[]
  imagenSubidaUsuario:any=[]
  imagenActiva:any

  listaImagenes:any=[]
  idClase:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    ruta_imagen:''
  };
  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

  temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    fondo1: '',
    fondo2: '',
    texto1: '',
    estado: ''
  }

  intervalo:any
  cursoForm:any
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('cerrarEditarModalPerfil') CerrarModal: any;
  @ViewChild('uploadForm') uploadForm: ElementRef | undefined;
  //variables de colores
  cfondo1:string='';
  cfondo2:string='';
  ctexto1:string='';

  constructor( public cardResumenService:CardResumenService, private imagenPerfilService:PerfilProfesorService,private activedRoute:ActivatedRoute, private temaProfesorService:TemaProfesorService, private router:Router, private formBuilder:FormBuilder, private toastrService:ToastrService,private uploadFotoService:UploadFotoPerfilService,private socketService:WebSocketService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idClase=params['idCurso'];
    this.idGradoCurso=params['idGrado'];
    this.obtenerDatosCursos();
    this.obtenerAlumnosCursos();
    this.getImagenesPerfil(2);
    this.getImagenPerfil(this.idGradoCurso);

    this.cursoForm=this.formBuilder.group({
      color_curso:new FormControl('',[Validators.required]),
    })

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet

    // En el componente o servicio del módulo profesor
    this.socketService.escucharEvento('actualizar-foto-perfil-admin').subscribe((data: any) => {
      if(data.usuario==this.idUsuario&&data.idRol==this.idRol){
        this.getImagenPerfil(this.idUsuario);
        }
      });

  }

  obtenerDatosCursos(idCurso=this.idClase){
    this.cardResumenService.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
      }
    )

  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.cfondo2=this.temaGet[i].fondo2;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  updateCurso(idCurso=this.idClase){
    var DataModificada:any={}
    if(this.f.color_curso.value!=''){
      DataModificada.color_curso=this.f.color_curso.value
    }
    if(Object.entries(DataModificada).length!=0){
      this.cardResumenService.updateCurso(idCurso,DataModificada).subscribe(
        res=>{
          this.obtenerDatosCursos()
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.success(`Curso Actualizado`,'Realizado')
        },
        err=>{
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.error(`Error al Actulizar`,'Error')
          console.log(err)
        }
      )
    }else{
      this.modalCloseEditar.nativeElement.click();
      //Aquí va el mensajito flotante de no se realizaron cambios
    }
  }
  //IMAGENES POR DEFECTO
  getImagenesPerfil(idCategoria:any){
    this.cardResumenService.getImagenCategoria(idCategoria).subscribe(
      res=>{
        this.listaImagenes=res
        console.log(this.listaImagenes)
      },
      err=>{
        console.log(err)
      }
    )
  }
  valueGetImagen(e:any){
    this.cursosIndividual.ruta_imagen=e
    console.log(this.cursosIndividual.ruta_imagen)
  }

  actualizarImagenPredisenada(idCurso=this.idClase){
    this.cardResumenService.updateCurso(idCurso,this.cursosIndividual).subscribe(
      res=>{
        this.obtenerDatosCursos()
        this.CerrarModal.nativeElement.click();
        this.toastrService.success(`Curso Actualizado`,'Realizado')
      },
      err=>{
        this.CerrarModal.nativeElement.click();
        this.toastrService.error(`Error al Actulizar`,'Error')
        console.log(err)
      }
    )
  }

  get f() { return this.cursoForm.controls; }

  //Subida de imagenes
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
      this.uploadFotoService.uploadFileWithProgressCurso(file,parseInt(this.idGradoCurso), idRol).subscribe(
        response => { // Maneja la respuesta del servidor
          console.log("Sii entre aqui")
          if (typeof response === 'number'){
            if (response >= 0 && response <= 100) {
              this.uploadProgress = response;
            }
          }else if(typeof response === 'object' && response.filePath){
            const filePathFinal:any=response.filePath;
            //ME FALTA COLOCAR BIEN LA INFO AQUI ASÍ BIEN INFORMATIVA
            this.imagenPerfilService.subidaDeImagenCurso(this.idGradoCurso,filePathFinal,file.size,this.idUsuario).subscribe(
              res=>{
                this.cursosIndividual[0].imagen=filePathFinal
              },
              err=>{
                console.log(err)
              }
            )
            // Realiza acciones adicionales con la respuesta del servidor si es necesario
            this.toastrService.success('El archivo: "'+ file.name +'" se ha subido correctamente.', 'Éxito', { timeOut: 3000 });
            this.getImagenPerfil(this.idGradoCurso)
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

  getImagenPerfil(idAdmin:string) {
    this.imagenPerfilService.getFotoCurso(idAdmin).subscribe(
      res=>{
        this.imagenActiva=res
        if(this.imagenActiva[0]?.ruta_imagen==undefined){
          this.cursosIndividual[0].imagen='assets/img/perfiles/sinfoto/blank_profile.png'
        }else{
          this.cursosIndividual[0].imagen=this.imagenActiva[0]?.ruta_imagen
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

}
