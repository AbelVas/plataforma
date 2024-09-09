import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { TutoresService } from '../../services/tutores.service';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from 'src/app/web-socket.service';
import * as XLSX from 'xlsx';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-tutores-admin-list',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('CrearEditarModal') modalCloseCrearEditar: any;
  @ViewChild('cerrarHijoModal') modalCloseHijo: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() alerta = new EventEmitter<any>();

  isLoading: boolean = false; // Controla el estado del loader
  estudianteEncontrado: boolean = false; // Controla si se muestra la tabla de resultados
  codigoEstudiante: string = ''; // Almacena el valor del código de estudiante buscado
  listaEstudiantes:any[]=[]
  listaTutorEstudiantesVinculados:any[]=[]

  listaTutores: any[] = [];
  tutorIndividual: any = {};
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['no', 'Tutor', 'usuario', 'estado', 'acciones'];
  isEditing = false;  // Controla si estamos en modo edición o creación

  // Formulario de tutor
  tutorForm = this.formBuilder.group({
    nombre_tutor: ['', Validators.required],
    apellido_tutor: ['', Validators.required],
    telefono1: ['', [Validators.required, Validators.maxLength(20)]],
    telefono2: ['', Validators.maxLength(20)],
    telefono_casa: ['', Validators.maxLength(45)],
    direccion: ['', Validators.required],
    direccion_trabajo: [''],
    usuario: ['', Validators.required],
    correo1: ['', [Validators.required, Validators.email]],
    correo2: ['', Validators.email],
    nombre_opcional: [''],
    dpi: ['', [Validators.required, Validators.maxLength(20)]],
  });

  camposFormulario = [
    { key: 'nombre_tutor', label: 'Nombre del Tutor' },
    { key: 'apellido_tutor', label: 'Apellido del Tutor' },
    { key: 'dpi', label: 'DPI' },
    { key: 'telefono1', label: 'Teléfono 1' },
    { key: 'telefono2', label: 'Teléfono 2' },
    { key: 'telefono_casa', label: 'Teléfono de Casa' },
    { key: 'direccion', label: 'Dirección' },
    { key: 'direccion_trabajo', label: 'Dirección de Trabajo' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'correo1', label: 'Correo Electrónico 1' },
    { key: 'correo2', label: 'Correo Electrónico 2' },
    { key: 'nombre_opcional', label: 'Nombre Opcional'}
  ];

  constructor(
    private tutorService: TutoresService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private socketService: WebSocketService,
    private alumnoService:AlumnosService
  ) {}

  ngOnInit(): void {
    this.getTutores();
    this.socketService.escucharEvento('actualizar-lista-tutores').subscribe((data: any) => {
      const toastMethod = data.titulo.includes('Eliminado') ? 'info' : data.titulo.includes('Editado') ? 'warning' : 'success';
      this.toastrService[toastMethod](data.mensaje, data.titulo);
      this.getTutores();
    });
    this.socketService.escucharEvento('acciones-vinculacion').subscribe((data: any) => {
      const toastMethod = data.titulo.includes('Eliminado') ? 'warning' : 'success';
      this.toastrService[toastMethod](data.mensaje, data.titulo);
      this.getTutores();
    });
  }
  //Vincular alumno tutor
  desvincularAlumnoTutor(idAlumno:string,idTutor:string){
    this.tutorService.deleteRelacionAlumnoTutor(idTutor,idAlumno).subscribe(
      res=>{
        this.obtenerAlumnosVinculadosTutor();
      },
      err=>{
        this.toastrService.error(err,'Error al Eliminar!')
      }
    )
  }
  //Vincular alumno tutor
  vincularAlumnoTutor(idAlumno:string){
    var datos={
      idTutor:this.tutorIndividual.idTutor,
      idAlumno:idAlumno
    }
   this.tutorService.vincularAlumnoTutor(datos).subscribe(
    res=>{
      this.getAlumnoPorCodigo();
    },
    err=>{
      this.toastrService.error(err,'Error al Eliminar!')
    }
   )
  }
  //obtener alumnos ya vinculados con un tutor
  obtenerAlumnosVinculadosTutor(){
    this.tutorService.getAlumnosVinculadosTutor(this.tutorIndividual.idTutor).subscribe(
      res=>{
        this.listaTutorEstudiantesVinculados=res
      },err=>{
        this.toastrService.error(err,'Error al Cargar!')
      }
    )
  }
    // Función para limpiar los campos del formulario y los resultados
    resetFormulario(): void {
      this.codigoEstudiante = '';         // Limpia el input
      this.listaEstudiantes = [];         // Vacía la lista de estudiantes
      this.estudianteEncontrado = false;  // Oculta la tabla
    }
  getAlumnoPorCodigo(){
    // Mostrar el loader
    this.isLoading = true;
    this.alumnoService.getAlumnoPorCodigo(this.codigoEstudiante,this.tutorIndividual.idTutor).subscribe(
      res=>{
        if(res==true||res!=''){
          this.listaEstudiantes=res
          //consolaaaaaaaaaaaa
          console.log(this.listaEstudiantes)
          this.isLoading = false;
          this.estudianteEncontrado=true
        }else{
          this.estudianteEncontrado=false
          this.isLoading = false;
          console.log("No se encuentra")
        }
      },err=>{
        console.log(err)
        this.estudianteEncontrado=false
        this.isLoading = false;
      }
    )
  }
  // Obtener lista de tutores
  getTutores(): void {
    this.tutorService.getTutor().subscribe(
      res => {
        this.listaTutores = res;
        this.dataSource = new MatTableDataSource(this.listaTutores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.error('Error al obtener tutores:', err);
      }
    );
  }
  exportarExcel(): void {
    // Extraer los datos de todos los tutores, incluyendo las propiedades completas
    const dataToExport = this.listaTutores.map((tutor, index) => {
      return {
        No: index + 1,
        Nombre: tutor.nombre_tutor,
        Apellido: tutor.apellido_tutor,
        Usuario: tutor.usuario,
        Teléfono_1: tutor.telefono1,
        Teléfono_2: tutor.telefono2,
        Teléfono_Casa: tutor.telefono_casa,
        Dirección: tutor.direccion,
        Dirección_Trabajo: tutor.direccion_trabajo,
        Correo_1: tutor.correo1,
        Correo_2: tutor.correo2,
        Nombre_Opcional: tutor.nombre_opcional,
        DPI: tutor.dpi,
        Estado: tutor.estado === '1' ? 'Activo' : 'Inactivo'
      };
    });

    // Crear el libro y la hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tutores');

    // Exportar el archivo Excel
    XLSX.writeFile(wb, 'Tutores.xlsx');
  }
  // Aplicar filtro en la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Eliminar tutor
  eliminarTutor(): void {
    this.tutorService.deleteTutor(this.tutorIndividual.idTutor).subscribe(
      () => {
        this.modalCloseEliminar.nativeElement.click();
        this.getTutores();
      },
      err => {
        this.toastrService.error(`Error al eliminar tutor: ${err}`, 'Error');
      }
    );
  }

  // Crear o editar tutor
  guardarTutor(): void {
    if (this.tutorForm.valid) {
      const formData = {
        ...this.tutorForm.value,
        ver_notas: 1,
        idRol: 3,
        estado: 1,
        pass: '123456'
      };

      if (this.isEditing) {
        this.editarTutor(formData);
      } else {
        this.crearTutor(formData);
      }
    } else {
      this.tutorForm.markAllAsTouched();
    }
  }

  // Crear nuevo tutor
  crearTutor(formData: any): void {
    this.tutorService.insertTutor(formData).subscribe(
      () => {
        this.modalCloseCrearEditar.nativeElement.click();
        this.getTutores();
      },
      err => {
        this.toastrService.error(`Error al crear tutor: ${err}`, 'Error');
      }
    );
    this.resetForm();
  }

  // Editar tutor existente
  editarTutor(formData: any): void {
    this.tutorService.editTutor(this.tutorIndividual.idTutor, formData).subscribe(
      () => {
        this.modalCloseCrearEditar.nativeElement.click();
        this.getTutores();
      },
      err => {
        this.toastrService.error(`Error al editar tutor: ${err}`, 'Error');
      }
    );
    this.resetForm();
  }

  // Resetea el formulario
  resetForm(): void {
    this.tutorForm.reset();
  }

  // Cerrar modal y resetear formulario
  onModalClose(): void {
    this.resetForm();
  }

  // Cargar los datos del tutor en el formulario
  buscarTutoresArray(idTutor: string): void {
    this.tutorIndividual = this.listaTutores.find((tutor: any) => tutor.idTutor === idTutor);
    if (this.tutorIndividual) {
      this.tutorForm.patchValue({
        nombre_tutor: this.tutorIndividual.nombre_tutor,
        apellido_tutor: this.tutorIndividual.apellido_tutor,
        telefono1: this.tutorIndividual.telefono1,
        telefono2: this.tutorIndividual.telefono2,
        telefono_casa: this.tutorIndividual.telefono_casa,
        direccion: this.tutorIndividual.direccion,
        direccion_trabajo: this.tutorIndividual.direccion_trabajo,
        usuario: this.tutorIndividual.usuario,
        correo1: this.tutorIndividual.correo1,
        correo2: this.tutorIndividual.correo2,
        nombre_opcional: this.tutorIndividual.nombre_opcional,
        dpi: this.tutorIndividual.dpi
      });
      this.isEditing = true;
    }
  }

  // Retorna los controles del formulario
  get f() {
    return this.tutorForm.controls;
  }
}
