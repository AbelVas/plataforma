import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActividadesOpcionesCursoService } from 'src/app/profesor/services/actividades-opciones-curso.service';
import { ForosService } from 'src/app/profesor/services/foros.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WebSocketService } from 'src/app/web-socket.service';//servicio que maneja el "Emitir evento" y "Escuchar Evento"
import { ConfiguracionesSistemaService } from 'src/app/configuraciones-sistema.service';
import { UploadFotoPerfilService } from 'src/app/upload-foto-perfil.service';
import decode from "jwt-decode"

@Component({
  selector: 'app-opciones-curso',
  templateUrl: './opciones-curso.component.html',
  styleUrls: ['./opciones-curso.component.css']
})
export class OpcionesCursoComponent implements OnInit {
  token: any = localStorage.getItem('Acces-Token');
  idUsuario: any
  idRol: any
  // CKEDITOR
  public AreaCkeditor = ClassicEditor;
  AnuncioCkeditor: any = '';
  RecursoCkeditor: any = '';
  TCotejoCkeditor: any = '';
  TDescripcionCkEditor: any = '';
  // CKEDITOR

  listaRecursoCurso: any = []
  validCheck: any = "1";
  RecursoIndividual: any = {
    idtbRecursoVideo: '',
    titulo: '',
    descripcion: '',
    fecha_creacion: '',
    idCurso: '',
    idUnidad: '',
    enlace: '',
    unidad: ''
  }
  RecursoIndividualEdit: any = {
    idtbRecursoVideo: '',
    titulo: '',
    descripcion: '',
    fecha_creacion: '',
    idCurso: '',
    idUnidad: '',
    enlace: '',
    unidad: ''
  }


  value: string = '';
  sppinerOn: boolean = true;
  idGrado: string = ''
  listaActividades: any = []
  tiposActividad: any = []
  listaCursosDocente: any = []
  cursosCopiar: any = []
  unidadesModal: any = [];
  idActividad: string = '';
  idProfesor: string = '';
  idCursoDocente: any = {};
  listaAlumnos: any = []
  listaCalificacionAlumno: any = []
  listaAnuncioCurso: any = []
  //Cosas Foros
  Foros: any = [];
  propiedadForo: any = {
    idForo: '',
    idUnidad: '',
    idCurso: '',
    tema: '',
    descripcion: '',
    enlace: '',
    ruta_archivo: '',
    peso_archivo: '',
    fecha_limite: '',
    fecha_creacion: '',
    activo: '1',
    editado: '0',
  }
  ForoIndividual: any = {
    idForo: '',
    idUnidad: '',
    idCurso: '',
    tema: '',
    descripcion: '',
    enlace: '',
    ruta_archivo: '',
    peso_archivo: '',
    fecha_limite: '',
    fecha_creacion: '',
    activo: '',
    editado: '',
  }
  ForoIndividualEdit: any = {
    idForo: '',
    idUnidad: '',
    idCurso: '',
    tema: '',
    descripcion: '',
    enlace: '',
    ruta_archivo: '',
    peso_archivo: '',
    fecha_limite: '',
    fecha_creacion: '',
    activo: '',
    editado: '',
  }


  //Crear Actividad
  propiedadActividad: any = {
    idTipoActividad: '',
    nombre_actividad: '',
    detalle: '',
    cotejo: '',
    fecha_entrega: '',
    valor: '',
    recurso: '',
    ruta_acceso: '',
    creada: '',
    disponible: '1',
    entrega_fuera_fecha: '1',
    idCurso: '',
    idUnidad: '',
    idDetalleActividad: ''
  }
  ActividadIndividual: any = {
    idTipoActividad: '',
    nombre_actividad: '',
    detalle: '',
    cotejo: '',
    fecha_entrega: '',
    valor: '',
    recurso: '',
    ruta_acceso: '',
    creada: '',
    disponible: '',
    entrega_fuera_fecha: '',
    idCurso: '',
    idUnidad: '',
    idDetalleActividad: ''
  }
  ActividadIndividualEdit: any = {
    idTipoActividad: '',
    nombre_actividad: '',
    detalle: '',
    cotejo: '',
    fecha_entrega: '',
    valor: '',
    recurso: '',
    ruta_acceso: '',
    creada: '',
    disponible: '',
    entrega_fuera_fecha: '',
    idCurso: '',
    idUnidad: '',
    idDetalleActividad: ''
  }
  datosCalificar: any = {}
  @Input() idCurso: any = ''
  //Grupo de aca, sirve para luego cerrar los modales si se obtiene un true desde la api
  @ViewChild('crearTareaModalCerrar') modalCloseCrear: any;
  @ViewChild('crearRecursoCerrar') modalRecursoCloseCrear: any;
  @ViewChild('eliminarTareaModalCerrar') modalCloseEliminar: any;
  @ViewChild('modalCloseEliminarRecurso') modalCloseEliminarRecurso: any;
  @ViewChild('crearForoModalCerrar') modalCloseForo: any;
  @ViewChild('editarActividadCerrar') modalCloseEditar: any;
  @ViewChild('editarRecursoCerrar') modalRecursoCloseEditar: any;
  @ViewChild('duplicarActividadCerrar') modalCloseDuplicar: any;

  //Formulario tareas
  crearTareaForm = this.formBuilder.group({
    idUnidad: new FormControl('', [Validators.required]),
    nombre_actividad: new FormControl('', [Validators.required]),
    fecha_entrega: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    detalle: new FormControl(''),
    cotejo: new FormControl(''),
    ultima_modificacion: new FormControl(''),
    entrega_fuera_fecha: new FormControl(''),
    disponible: new FormControl('')
  })
  //Formulario Foros
  crearForoForm = this.formBuilder.group({
    idUnidad: new FormControl('', [Validators.required]),
    tema: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fecha_limite: new FormControl('', [Validators.required]),
    enlace: new FormControl(''),
    fecha_creacion: new FormControl(''),
    activo: new FormControl(''),
    editado: new FormControl(''),
  })
  //Formulario recurosweb
  crearRecursoForm = this.formBuilder.group({
    idUnidad: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    enlace: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  })

  tareaCreadaObj: any = [];
  ForoCreadaObj: any = [];
  submitted = false;
  //fecha para hoy
  hoy: any = new Date();
  mesActual = this.hoy.getMonth() + 1;
  fecha = this.hoy.getFullYear() + '-' + this.mesActual + '-' + this.hoy.getDate()

  @Input() cfondo2: string = '';
  @Input() ctexto1: string = '';

  constructor(private configuracionesSistema: ConfiguracionesSistemaService, private uploadFotoService: UploadFotoPerfilService, private actividadesOpcionesCursoService: ActividadesOpcionesCursoService, private activedRoute: ActivatedRoute, private formBuilder: FormBuilder, private toastrService: ToastrService, private foroService: ForosService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    const decodedToken: any = decode(this.token);
    this.idUsuario = decodedToken.idUsuario;
    this.idRol = decodedToken.idRol;
    const params = this.activedRoute.snapshot.params;
    this.idProfesor = params['idProfesor'];
    this.idGrado = params['idGrado'];
    this.idCurso = params['idCurso'];
    this.getTipoActividad()
    this.getUnidadesActivas()
    this.getTareas()
    this.getCursosDocente()
    this.getAlumnos();
    this.getRecursosPorGrado();
    this.getForo()
    this.configutacionPlataformaAcademica()
  }

  private modalRecurso: any;
  private modalRecursoEdit: any;
  private modalTarea: any;
  private modalTareaEdit: any;
  private modalForo: any;
  private modalForoEdit: any;
  archivoTarea: any;
  ngAfterViewInit(): void {
    this.modalRecurso = document.getElementById('CrearRecurso');
    this.modalRecursoEdit = document.getElementById('EditarRecurso');
    this.modalTarea = document.getElementById('CrearTarea');
    this.modalTareaEdit = document.getElementById('EditarTarea');
    this.modalForo = document.getElementById('CrearForo');
    this.modalForoEdit = document.getElementById('EditarForo');
    if (this.modalRecurso) {
      this.modalRecurso.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));
    }
    if (this.modalRecursoEdit) {
      this.modalRecursoEdit.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));
    }

    if (this.modalTarea) {
      this.modalTarea.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));
    }
    if (this.modalTareaEdit) {
      this.modalTareaEdit.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));

      if (this.modalForo) {
        this.modalForo.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));
      }
      if (this.modalForoEdit) {
        this.modalForoEdit.addEventListener('hidden.bs.modal', this.FormatSet.bind(this));
      }
    }
  }

  validarCalificacionRefresh(idActividad: string, idUnidad: string) {
    this.getAlumnoCalificacionActividad(idActividad, idUnidad);
  }

  calificarActividad(Calificacaion: any, idActividad: string, idAlumno: string, ver_nota: string) {
    const elemto = Calificacaion.currentTarget as HTMLInputElement //para acceder al valor de los select en el HTML
    const value = elemto.value
    if (value != '') {
      var nota: any = {
        idAlumno: idAlumno,
        calificacion: value,
        idRolEnvia: "2",
        idUsuarioEnvia: this.idProfesor,
        idRolRecibe: "4",
        idRolRecibe2: "3",
        idUsuarioRecibe: idAlumno,
        idUsuarioRecibe2: "",
        titulo_notificacion: "Calificacion Actividad",
        mensaje: "Se ha calificado la siguiente actividad: " + this.ActividadIndividual.nombre_actividad,
        visto_recibe: "0",
        visto_envia: "1",
        verNota: ver_nota,
        disponible: this.ActividadIndividual.disponible,
      }
      console.log(nota)

      this.actividadesOpcionesCursoService.buscarTutor(idAlumno).subscribe(
        res => {
          nota.idUsuarioRecibe2 = res
          nota.idUsuarioRecibe2 = nota.idUsuarioRecibe2[0].idTutor
          this.actividadesOpcionesCursoService.calificarActividad(idActividad, nota).subscribe(
            res => {
              this.toastrService.success(`Calificaciones Guardadas`, 'Realizado')
            },
            err => {
              this.toastrService.error(`Calificaciones no Guardadas`, 'Error')
            }
          )
        },
        err => {
          console.log("No se pudo bb")
          this.actividadesOpcionesCursoService.calificarActividad(idActividad, nota).subscribe(
            res => {
              this.toastrService.success(`Calificaciones Guardadas`, 'Realizado')
            },
            err => {
              this.toastrService.error(`Calificaciones no Guardadas`, 'Error')
            }
          )
        }
      )
    }
  }

  getAlumnoCalificacionActividad(idActividad: string, idUnidad: string) {
    this.datosCalificar.idDetalleActividad = idActividad
    this.datosCalificar.idUnidad = idUnidad
    this.actividadesOpcionesCursoService.getAlumnoCalificacionActividad(this.idCurso, this.datosCalificar).subscribe(
      res => {
        this.listaCalificacionAlumno = res;
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getAlumnos() {
    this.actividadesOpcionesCursoService.getAlmunosGrado(this.idGrado).subscribe(
      res => {
        this.listaAlumnos = res
      },
      err => {
        console.log(err)
      }
    )
  }

  arregloCursosaCopiar(event: Event) {
    const elemto = event.currentTarget as HTMLInputElement //para acceder al valor de los select en el HTML
    const value = elemto.value
    const isCheked = elemto.checked

    if (isCheked == true) {
      var existe = this.cursosCopiar.indexOf(value)
      if (existe == '-1') {
        this.cursosCopiar.push(value)
      }
    } else {
      this.cursosCopiar = this.cursosCopiar.filter((i: string) => i !== value)
    }
  }

  duplicarTareas(idActividad: string, event: Event) {
    var idCursosFinal: any = []
    for (let i = 0; i < this.cursosCopiar.length; i++) {
      idCursosFinal.push({ idCurso: this.cursosCopiar[i] })
    }
    this.actividadesOpcionesCursoService.duplicarTarea(idActividad, idCursosFinal).subscribe(
      res => {
        this.modalCloseDuplicar.nativeElement.click();
        this.getCursosDocente()
        this.getTareas()
        this.cursosCopiar = []
        this.toastrService.success(`Actividad Duplicada`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Actividad no Duplicada`, 'Error')
      }
    )
  }
  getTareas() {
    this.actividadesOpcionesCursoService.getTareasCurso(this.idCurso).subscribe(
      res => {
        this.sppinerOn = false;
        this.listaActividades = res
      },
      err => {
        console.log(err)
        this.sppinerOn = false;
      }
    )
  }
  buscarActividadArray(idActividad: string) {
    this.ActividadIndividual = this.listaActividades.find((x: any) => x.idDetalleActividad === idActividad)
    this.ActividadIndividualEdit = this.listaActividades.find((x: any) => x.idDetalleActividad === idActividad)
  }

  get f() { return this.crearTareaForm.controls; }

  editarActividad(idActividad: string) {
    this.submitted = true;
    if (this.crearTareaForm.invalid) {
      this.toastrService.error(`Completar información restante`, 'Error')
      return;
    }
    this.crearTareaForm.value.disponible = this.propiedadActividad.disponible;
    this.crearTareaForm.value.entrega_fuera_fecha = this.propiedadActividad.entrega_fuera_fecha;
    this.crearTareaForm.value.ultima_modificacion = this.fecha;
    this.actividadesOpcionesCursoService.updateActividad(idActividad, this.crearTareaForm.value).subscribe(
      res => {
        this.modalCloseEditar.nativeElement.click();
        this.getTareas()
        this.toastrService.success(`Actividad Editada`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Actividad no Editada`, 'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }

  eliminarActividad(idActividad: string) {
    this.actividadesOpcionesCursoService.deleteTarea(idActividad).subscribe(
      res => {
        this.modalCloseEliminar.nativeElement.click();
        this.submitted = false;
        this.crearTareaForm.reset();
        this.getTareas();
        this.toastrService.success(`Actividad Eliminada`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Actividad no Eliminada`, 'Error')
      }
    )
  }
  getForo() {
    this.foroService.getForosCurso(this.idCurso).subscribe(
      res => {
        this.Foros = res
      },
      err => {
        console.log(err)
      }
    )
  }
  crearForo() {
    this.submitted = true;
    if (this.crearForoForm.invalid) {
      return;
    }
    this.ForoCreadaObj = this.crearForoForm.value
    this.ForoCreadaObj.idCurso = this.idCurso
    this.ForoCreadaObj.fecha_creacion = this.fecha
    this.ForoCreadaObj.activo = '1'
    this.ForoCreadaObj.editado = '0'
    this.foroService.PostForos(this.ForoCreadaObj).subscribe(
      res => {
        this.modalCloseCrear.nativeElement.click();
        this.submitted = false;
        this.crearForoForm.reset();
        this.getForo()
        this.toastrService.success(`Foro Creado`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Foro no Creado`, 'Error')
        this.crearForoForm.reset()
      }
    )
  }

  editarForo(idForo: string) {
    this.submitted = true;
    if (this.crearForoForm.invalid) {
      this.toastrService.warning(`Completar información restante`, 'Advertencia')
      return;
    }
    this.crearForoForm.value.editado = "1";
    this.foroService.UpdateForo(idForo, this.crearForoForm.value).subscribe(
      res => {
        this.modalCloseEditar.nativeElement.click();
        this.getForo()
        this.toastrService.success(`Foro Editado`, 'Realizado')
        this.crearForoForm.reset()
      },
      err => {
        console.log(err)
        this.toastrService.error(`Foro no Editado`, 'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }

  eliminarForo(idForo: string) {
    this.foroService.DelForo(idForo).subscribe(
      res => {
        this.toastrService.success(`Foro Eliminado`, 'Realizado')
      },
      err => {
        this.toastrService.error(`Error al eliminar Foro`, 'Error')
      }
    )

  }

  buscarForo(idForo: string) {
    this.ForoIndividual = this.Foros.find((x: any) => x.idForo === idForo)
    this.ForoIndividualEdit = this.Foros.find((x: any) => x.idForo === idForo)
  }

  //Controladores de foro
  get F() { return this.crearForoForm.controls; }
  fileTarea: File | null = null;
  uploadProgress: any
  crearTarea(form: HTMLFormElement) {
    this.submitted = true;
    if (this.crearTareaForm.invalid) {
      return;
    }

    this.tareaCreadaObj = this.crearTareaForm.value
    this.tareaCreadaObj.idCurso = this.idCurso
    this.tareaCreadaObj.idTipoActividad = '1'
    this.tareaCreadaObj.creada = this.fecha
    this.tareaCreadaObj.disponible = this.propiedadActividad.disponible
    this.tareaCreadaObj.entrega_fuera_fecha = this.propiedadActividad.entrega_fuera_fecha

    if (this.subirArchivo == true && !this.crearTareaForm.invalid) {
      this.crearTareaForm.get('detalle')?.reset();
      this.crearTareaForm.get('cotejo')?.reset();
      const fileInput: HTMLInputElement | null = form.querySelector('#subirArchivoTarea');
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        this.fileTarea = fileInput.files[0];
        this.uploadFotoService.uploadFileWithProgress(this.fileTarea, this.idUsuario, this.idRol, 'tarea', this.extensiones_documentos, this.tamano_maximo_archivo_actividadaes, this.idCurso).subscribe(
          response => {
            if (typeof response === 'number') {
              if (response >= 0 && response <= 100) {
                this.uploadProgress = response;
              }
            } else if (typeof response === 'object' && response.filePath) {
              this.tareaCreadaObj.ruta_recurso = response.filePath;
              this.tareaCreadaObj.peso_recurso = this.fileTarea?.size;
              this.actividadesOpcionesCursoService.crearTarea(this.tareaCreadaObj).subscribe(
                res => {
                  this.modalCloseCrear.nativeElement.click();
                  this.submitted = false;
                  this.crearTareaForm.reset();
                  this.getTareas()
                  this.toastrService.success(`Tarea Creada`, 'Realizado')
                },
                err => {
                  console.log(err)
                  this.toastrService.error(`Tarea no Creada`, 'Error')
                }
              )
            }

          },
          err => {
          }
        )
      }
    } else if (this.subirArchivo == false && !this.crearTareaForm.invalid) {
      this.actividadesOpcionesCursoService.crearTarea(this.tareaCreadaObj).subscribe(
        res => {
          this.modalCloseCrear.nativeElement.click();
          this.submitted = false;
          this.crearTareaForm.reset();
          this.getTareas()
          this.toastrService.success(`Tarea Creada`, 'Realizado')
        },
        err => {
          console.log(err)
          this.toastrService.error(`Tarea no Creada`, 'Error')
        }
      )
    }

  }
  getCursosDocente() {
    this.idCursoDocente.idCurso = this.idCurso
    this.actividadesOpcionesCursoService.getCursosProfesor(this.idProfesor, this.idCursoDocente).subscribe(
      res => {
        this.listaCursosDocente = res
      },
      err => {
        console.log(err)
      }
    )
  }
  getUnidadesActivas() {
    this.actividadesOpcionesCursoService.getUnidadesActivas().subscribe(
      res => {
        this.unidadesModal = res
      },
      err => {
        console.log(err)
      }
    )
  }
  getTipoActividad() {
    this.actividadesOpcionesCursoService.getTiposActividad().subscribe(
      res => {
        this.tiposActividad = res
      },
      err => {
        console.log(err)
      }
    )
  }
  selectedCheckDisponible(e: any) {
    if (e.target.checked) {
      return this.propiedadActividad.disponible = '1';
    } else {
      return this.propiedadActividad.disponible = '0';
    }
  }
  noselectedCheckDisponible(e: any) {
    if (e.target.checked == false) {
      return this.propiedadActividad.disponible = '0';
    } else {
      return this.propiedadActividad.disponible = '1';
    }
  }
  selectedCheckFueraFecha(e: any) {
    if (e.target.checked) {
      return this.propiedadActividad.entrega_fuera_fecha = '1';
    } else {
      return this.propiedadActividad.entrega_fuera_fecha = '0';
    }
  }
  noselectedCheckFueraFecha(e: any) {
    if (e.target.checked == false) {
      return this.propiedadActividad.entrega_fuera_fecha = '0';
    } else {
      return this.propiedadActividad.entrega_fuera_fecha = '1';
    }
  }
  //logica Check para editar
  selectedCheckDisponibleEditar(e: any) {
    if (e.target.checked) {
      return this.propiedadActividad.disponible = '1';
    } else {
      return this.propiedadActividad.disponible = '0';
    }
  }
  noselectedCheckDisponibleEditar(e: any) {
    if (e.target.checked == false) {
      return this.propiedadActividad.disponible = '0';
    } else {
      return this.propiedadActividad.disponible = '1';
    }
  }
  selectedCheckFueraFechaEditar(e: any) {
    if (e.target.checked) {
      return this.propiedadActividad.entrega_fuera_fecha = '1';
    } else {
      return this.propiedadActividad.entrega_fuera_fecha = '0';
    }
  }
  noselectedCheckFueraFechaEditar(e: any) {
    if (e.target.checked == false) {
      return this.propiedadActividad.entrega_fuera_fecha = '0';
    } else {
      return this.propiedadActividad.entrega_fuera_fecha = '1';
    }
  }
  //para los forms siempre debemos traer los validadores
  get R() { return this.crearRecursoForm.controls; }

  //Aquí empieza lo de los recursos web
  getRecursosPorGrado() {
    this.actividadesOpcionesCursoService.getRecursosCurso(this.idCurso).subscribe(
      res => {
        this.listaRecursoCurso = res;
      },
      err => {
        console.log(err)
      }
    )
  }

  buscarActividadArrayRecursos(idtbRecursoVideo: string) {
    this.RecursoIndividual = this.listaRecursoCurso.find((x: any) => x.idtbRecursoVideo === idtbRecursoVideo)
    this.RecursoIndividualEdit = this.listaRecursoCurso.find((x: any) => x.idtbRecursoVideo === idtbRecursoVideo)

  }

  eliminarRecurso(idtbRecursoVideo: string) {
    this.actividadesOpcionesCursoService.deleteRecurso(idtbRecursoVideo).subscribe(
      res => {
        this.modalCloseEliminarRecurso.nativeElement.click();
        this.submitted = false;
        this.crearRecursoForm.reset();
        this.getRecursosPorGrado();
        this.toastrService.success(`Recurso Eliminado`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Recurso no Eliminado`, 'Error')
      }
    )
  }

  editarRecurso(idtbRecursoVideo: string) {
    this.submitted = true;
    if (this.crearRecursoForm.invalid) {
      this.toastrService.error(`Completar informacion restante`, 'Error')
      return;
    }
    this.actividadesOpcionesCursoService.updateRecurso(idtbRecursoVideo, this.crearRecursoForm.value).subscribe(
      res => {
        this.modalRecursoCloseEditar.nativeElement.click();
        this.getRecursosPorGrado()
        this.toastrService.success(`Actividad Editada`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Actividad no Editada`, 'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }
  crearRecurso() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.crearRecursoForm.invalid) {
      return;
    }
    // display form values on success
    this.tareaCreadaObj = this.crearRecursoForm.value
    this.tareaCreadaObj.idCurso = this.idCurso
    this.tareaCreadaObj.fecha_creacion = this.fecha
    this.actividadesOpcionesCursoService.crearRecurso(this.tareaCreadaObj).subscribe(
      res => {
        this.modalRecursoCloseCrear.nativeElement.click();
        this.submitted = false;
        this.crearRecursoForm.reset();
        this.getRecursosPorGrado()
        this.toastrService.success(`Recurso Creado`, 'Realizado')
      },
      err => {
        console.log(err)
        this.toastrService.error(`Recurso no Creado`, 'Error')
      }
    )
  }


  FormatSet() {
    this.submitted = false;
    this.crearRecursoForm.reset();
    this.crearTareaForm.reset()
    this.crearForoForm.reset()
  }
  subirArchivo: boolean = false;
  toggleSubirArchivo() {
    this.subirArchivo = !this.subirArchivo;
    this.cd.detectChanges();
  }

  //SUBIDA DE ARCHIVOS 
  vistaPrevia: any = null;
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
  extensiones_documentos: any
  tamano_maximo_archivo_actividadaes: any
  configutacionPlataformaAcademica() {
    this.configuracionesSistema.getConfiguracionesPlataforma().subscribe(
      res => {
        if (res) {
          const {
            extensiones_documentos,
            tamano_maximo_archivo_actividadaes,
          } = res[0];
          // Verifica que los campos existan antes de asignarlos a las variables
          this.extensiones_documentos = extensiones_documentos ? extensiones_documentos.split(',') : [];
          this.tamano_maximo_archivo_actividadaes = tamano_maximo_archivo_actividadaes
        } else {
          console.error('La respuesta del servidor es nula o está vacía.');
        }
      },
      err => {
        console.log(err)
      }
    )
  }


}

