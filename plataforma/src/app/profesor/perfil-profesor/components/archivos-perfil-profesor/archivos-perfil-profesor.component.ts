import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RenasApeApoService } from 'src/app/profesor/services/renas-ape-apo.service';
import decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UploadFotoPerfilService } from 'src/app/upload-foto-perfil.service';
import { ConfiguracionesSistemaService } from 'src/app/configuraciones-sistema.service';

@Component({
  selector: 'app-archivos-perfil-profesor',
  templateUrl: './archivos-perfil-profesor.component.html',
  styleUrls: ['./archivos-perfil-profesor.component.css']
})
export class ArchivosPerfilProfesorComponent implements OnInit {
  antecedentesPenales:any = [];
  antecedentesPoliciacos:any = [];
  RENAS: any = [];

  nuevoArchivoSubidaRenas:string="0"
  nuevoArchivoSubidaAPenales:string="0"
  nuevoArchivoSubidaAPoliciacos:string="0"

  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any;

  rutaEliminar:string=''
  eliminadoRenas:string="0"
  eliminadoPenales:string="0"
  eliminadoPoliciacos:string="0"
  //subir archivos dependencias plugin
  uploadProgress: number | undefined;
  @ViewChild('uploadForm') uploadForm: ElementRef | undefined; //para reiniciar el formulario.
  @ViewChild('fileInput') subirArchivoInput: ElementRef | undefined;
  @ViewChild('uploadFormPenales') subirArchivoInputPenales: ElementRef | undefined;
  @ViewChild('uploadFormPoliciacos') subirArchivoInputPoliciacos: ElementRef | undefined;
  constructor(private configuracionesSistema:ConfiguracionesSistemaService,private renasApeApo:RenasApeApoService,private toastrService:ToastrService, private subirArchivo:UploadFotoPerfilService){}
  configLoaded = false;
  plan:string | undefined
  //configuracionees
  extensionesDocumentos:any
  tamanoMaximoSubidaRenasPenalesPoliciacos:any

  //fin configuraciones
  ngOnInit(): void {
    this.configutacionPlataformaAcademica()
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.renasGet();
    this.penalesGet()
    this.policialesGet()
  }
  renasGet() {
    this.renasApeApo.getRenas(this.idUsuario).subscribe(
      res => {
        this.RENAS=res
        if(this.RENAS && this.RENAS.length > 0){
          this.RENAS.ruta_archivo=res.ruta_archivo
          this.nuevoArchivoSubidaRenas="1"
          this.eliminadoRenas="0"
        }else{
          this.RENAS=null
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  configutacionPlataformaAcademica(){
    this.configuracionesSistema.getConfiguracionesPlataforma().subscribe(
      res=>{
        if (res) {
          const {
            extensiones_documentos,
            tamano_maximo_foto_perfil_usuario,
          } = res[0];
          // Verifica que los campos existan antes de asignarlos a las variables
          this.extensionesDocumentos = extensiones_documentos ? extensiones_documentos.split(',') : [];
          this.tamanoMaximoSubidaRenasPenalesPoliciacos=tamano_maximo_foto_perfil_usuario
        } else {
          console.error('La respuesta del servidor es nula o está vacía.');
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  penalesGet(){
    this.renasApeApo.getPenales(this.idUsuario).subscribe(
      res => {
        this.antecedentesPenales=res
      if(this.antecedentesPenales && this.antecedentesPenales.length > 0){
        this.antecedentesPenales.ruta_archivo=res.ruta_archivo
        this.nuevoArchivoSubidaAPenales="1"
        this.eliminadoPenales="0"
      }else{
        this.antecedentesPenales=null
      }
      },
      err => {
        console.log(err);
      }
    );
  }
  policialesGet(){
    this.renasApeApo.getPoliciacos(this.idUsuario).subscribe(
      res => {
        this.antecedentesPoliciacos=res
      if(this.antecedentesPoliciacos && this.antecedentesPoliciacos.length > 0){
        this.antecedentesPoliciacos.ruta_archivo=res.ruta_archivo
        this.nuevoArchivoSubidaAPoliciacos="1"
        this.eliminadoPoliciacos="0"
      }else{
        this.antecedentesPoliciacos=null
      }
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmit(form: HTMLFormElement,tipoSubida:string){
    if(tipoSubida=='renas'){
      const fileInput = this.subirArchivoInput?.nativeElement as HTMLInputElement;
      if(fileInput && fileInput.files && fileInput.files.length > 0) {
        const file: File = fileInput.files[0];
        this.subirArchivoService(file,tipoSubida);
      }else{
       this.toastrService.error('Por favor, selecciona un archivo para subir.', 'Error', { timeOut: 10000 });
      }
    }else if(tipoSubida=='penales'){
      const fileInputPenales=this.subirArchivoInputPenales?.nativeElement as HTMLInputElement;
      if(fileInputPenales && fileInputPenales.files && fileInputPenales.files.length > 0){
        const file: File = fileInputPenales.files[0];
        this.subirArchivoService(file,tipoSubida);
      }else{

       this.toastrService.error('Por favor, selecciona un archivo para subir.', 'Error', { timeOut: 10000 });
      }
    }else if(tipoSubida=='policiacos'){
      const fileInputPoliciacos=this.subirArchivoInputPoliciacos?.nativeElement as HTMLInputElement;
      if(fileInputPoliciacos && fileInputPoliciacos.files && fileInputPoliciacos.files.length > 0){
        const file: File = fileInputPoliciacos.files[0];
        this.subirArchivoService(file,tipoSubida);
      }else{
       this.toastrService.error('Por favor, selecciona un archivo para subir.', 'Error', { timeOut: 10000 });
      }
    }
  }
  reiniciarModal() {
    if (this.uploadForm) {
      // Obtener el formulario y restablecer sus valores
      const form: any = this.uploadForm.nativeElement;
      form.reset();
      this.uploadProgress = undefined; // Reiniciar el progreso de la barra
    } else {
      console.error('Error: uploadForm is undefined.'); // Opcional: Mostrar un mensaje de error si uploadForm es undefined
    }
  }
  subirArchivoService(file:any,tipoSubida:any){
    this.subirArchivo.uploadFileWithProgress(file, this.idUsuario,tipoSubida,tipoSubida,this.extensionesDocumentos,this.tamanoMaximoSubidaRenasPenalesPoliciacos).subscribe(
      response=>{
        if (typeof response === 'number'){
          if (response >= 0 && response <= 100) {
            this.uploadProgress = response;
          }
        }else if(typeof response === 'object' && response.filePath){
          const filePathFinal:any=response.filePath;
          if(tipoSubida=='renas'){
            this.renasApeApo.insertRenas(this.idUsuario,file.size,filePathFinal).subscribe(
              res=>{
                this.renasGet()
              },
              err=>{
                console.log(err)
              }
            )
          }else if(tipoSubida=='penales'){
            this.renasApeApo.insertPenales(this.idUsuario,file.size,filePathFinal).subscribe(
              res=>{
                this.penalesGet()
              },
              err=>{
                console.log(err)
              }
            )
          }else if(tipoSubida=='policiacos'){
            this.renasApeApo.insertPoliciacos(this.idUsuario,file.size,filePathFinal).subscribe(
              res=>{
                this.policialesGet()
              },
              err=>{
                console.log(err)
              }
            )
          }
        }
      },
      error=>{
        this.toastrService.error('Error al subir el archivo: '+error, 'Error', { timeOut: 10000 });
      }
    )
  }
  asignarValaoresParaEliminar(aquienva:string,ruta:string){
    if(aquienva=='renas'){
      this.eliminadoRenas="1"
    }else if(aquienva=='penales'){
      this.eliminadoPenales="1"
    }else if(aquienva=='policiacos'){
      this.eliminadoPoliciacos="1"
    }
    this.rutaEliminar=ruta;
  }
  reiniciarValaoresParaEliminar(){
      this.eliminadoRenas="0"
      this.eliminadoPenales="0"
      this.eliminadoPoliciacos="0"
      this.rutaEliminar=''
  }
  eliminarRenasPenalesPoliciacos(tipoSubida:any){
    this.subirArchivo.deleteFile(this.rutaEliminar,tipoSubida).subscribe(
      res=>{
        if(tipoSubida=="renas"){
          this.renasApeApo.deleteArchivo(this.idUsuario,tipoSubida).subscribe(
            res=>{
              this.eliminadoRenas="1"
              this.renasGet();
            },
            err=>{
              console.log(err)
          })
        }else if(tipoSubida=="penales"){
          this.renasApeApo.deleteArchivo(this.idUsuario,tipoSubida).subscribe(
            res=>{
              this.eliminadoPenales="1"
              this.penalesGet();
            },
            err=>{
              console.log(err)
          })
        }else if(tipoSubida=="policiacos"){
          this.renasApeApo.deleteArchivo(this.idUsuario,tipoSubida).subscribe(
            res=>{
              this.eliminadoPoliciacos="1"
              this.policialesGet()
            },
            err=>{
              console.log(err)
          })
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
}
