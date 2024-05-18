import { Component, OnInit } from '@angular/core';
import { ConfiguracionesSistemaService } from 'src/app/configuraciones-sistema.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-aspectos-tecnicos',
  templateUrl: './aspectos-tecnicos.component.html',
  styleUrls: ['./aspectos-tecnicos.component.css']
})
export class AspectosTecnicosComponent implements OnInit {

  extensionesDocumentos:any=[]
  extensionesImagenes:any=[]
  plan:any
  tamanoMaximoArchivoActividades:any
  tamanoMaximoArchivoRecurso:any
  tamanoMaximoFotoCurso:any
  tamanoMaximoFotoPerfilUsuario:any
  tamanoMaximoSubidaAlumno:any
  tamanoMaximoSubidaDescripcionActividad:any
  tamanoMaximoSubidaRubricaActividad:any
  tamanoMaximoSubidaRenasPenalesPoliciacos:any
  idConfiguracionesPlataforma:any
  //modal modificar
  getExtensionImagenModificarIndividual:any={}
  constructor(private configuracionesService: ConfiguracionesSistemaService,private formBuilder: FormBuilder) { }
  configuraciones: any;
  ngOnInit(): void {
    this.getConfiguraciones()
    this.getExtensionesArchivosImagenes()
    this.getExtensionesArchivosDocumentos()
  }
  getExtensionesArchivosImagenes(){
    this.configuracionesService.getExtensionesArchivosImagenes().subscribe(
      res=>{
        this.extensionesImagenes=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  getExtensionesArchivosDocumentos(){
    this.configuracionesService.getExtensionesArchivosDocumentos().subscribe(
      res=>{
        this.extensionesDocumentos=res
      },
      err=>{
        console.log(err)
      }
    )
  }
  buscarArrayExtensionesImagenes(idExtensionesArchivos:string){
    this.getExtensionImagenModificarIndividual=this.extensionesImagenes.find((x:any)=>x.idExtensionesImagenes===idExtensionesArchivos)
  }
  updateExtensionesArchivosImagenes(idExtensionesArchivos: number, activo: string) {


  }
  updateExtensionesArchivosDocumentos(idModificar:string){

  }
  getConfiguraciones(){
      this.configuracionesService.getConfiguracionesPlataforma().subscribe(
        res=>{
            const {
              idConfiguracionesPlataforma,
              plan,
              tamano_maximo_archivo_actividadaes,
              tamano_maximo_archivo_recurso,
              tamano_maximo_foto_curso,
              tamano_maximo_foto_perfil_usuario,
              tamano_maximo_renas_penales_policiacos,
              tamano_maximo_subida_alumno,
              tamano_maximo_subida_descripcion_actividad,
              tamano_maximo_subida_rubrica_actividad
            } = res[0];
            this.plan = plan || '';
            this.tamanoMaximoArchivoActividades = tamano_maximo_archivo_actividadaes || '';
            this.tamanoMaximoArchivoRecurso = tamano_maximo_archivo_recurso || '';
            this.tamanoMaximoFotoCurso = tamano_maximo_foto_curso || '';
            this.tamanoMaximoFotoPerfilUsuario = tamano_maximo_foto_perfil_usuario || '';
            this.tamanoMaximoSubidaAlumno = tamano_maximo_subida_alumno || '';
            this.tamanoMaximoSubidaDescripcionActividad = tamano_maximo_subida_descripcion_actividad || '';
            this.tamanoMaximoSubidaRubricaActividad = tamano_maximo_subida_rubrica_actividad || '';
            this.tamanoMaximoSubidaRenasPenalesPoliciacos=tamano_maximo_renas_penales_policiacos
            this.idConfiguracionesPlataforma=idConfiguracionesPlataforma

            console.log(res[0])
        },
        err=>{
          console.log(err)
        })
  }
}
