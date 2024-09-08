import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { TutoresService } from '../../services/tutores.service';


@Component({
  selector: 'app-tutores-admin-list',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  constructor(private tutorService:TutoresService,private formBuilder:FormBuilder) { }

  listaTutores:any=[];
  docenteIndividual:any={}
  isEditPassword:string='0'
  variable:string='1'
  isCorrectCodigo:boolean=false
  codigoError:string=''
  passNoCoincide:string=''

   //fecha para hoy
   hoy:any=new Date();
   mesActual=this.hoy.getMonth()+1;
   fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()
  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  @Output() alerta=new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataTable: any;
  dataSource:any;
  tutoresPorPagina=10;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = ['no','Tutor','Hijo','usuario','estado','acciones'];

  isEditing = false;  // Variable para controlar si estamos creando o editando
  tutorIndividual: any;  // Aquí cargarás los datos del tutor seleccionado
  //form de tutor
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
  //fin del form tutor
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  classAlerta:string=''
  mensajeAlerta:string=''
  icon=''
  intervalo:any
  submitted=false;

  ngOnInit(): void {
    this.getTutores();
  }
  getTutores(){
    this.tutorService.getTutor().subscribe(
      res=>{
        this.listaTutores=res
        this.dataSource = new MatTableDataSource(this.listaTutores);
        this.paginator._intl.itemsPerPageLabel = 'Tutores por Página: ';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err=>{
        console.log(err)
      }
    )
  }
  // Función para abrir el modal en modo edición
  editarTutor(): void {
    if (this.tutorForm.valid) {
      const formData = this.tutorForm.value;
      this.tutorService.editTutor(this.tutorIndividual.idTutor, formData).subscribe(
        res => {
          console.log('Tutor actualizado exitosamente', res);
          // Resetear y cerrar el modal
          this.resetForm();
        },
        err => {
          console.log('Error al actualizar el tutor', err);
        }
      );
    } else {
      this.tutorForm.markAllAsTouched();
    }
  }
//funcion para crear y que variable  isEditing = false;
creando(){
  this.resetForm()
  this.isEditing = false;
}
  crearTutor(): void {
    if (this.tutorForm.valid) {
      // Lógica para enviar los datos del formulario
      const formData = {
      ...this.tutorForm.value,  // Incluye los valores del formulario
      ver_notas: 1,             // Propiedad adicional ver_notas
      idRol: 3,
      estado:1,
      pass:"123456"
    };
      this.tutorService.insertTutor(formData).subscribe(
        res => {
          // Aquí puedes manejar la respuesta de la API
          console.log('Tutor creado exitosamente', res);
        },
        err => {
          console.log('Error al crear tutor', err);
        }
      );
      // Resetear luego de guardar
      this.resetForm();
    } else {
      // Marca todos los controles como tocados para mostrar errores
      this.tutorForm.markAllAsTouched();
    }
  }
  resetForm(): void {
    // Resetea el formulario y marca como no tocado
    this.tutorForm.reset();
  }
  onModalClose(): void {
    // Llama a resetForm() al cerrar el modal
    this.resetForm();
  }
 // Cargar datos de un tutor en el formulario para editar
 buscarTutoresArray(idTutor: string): void {
  // Buscar al tutor en la lista por el ID
  this.tutorIndividual = this.listaTutores.find((x: any) => x.idTutor === idTutor);

  console.log(this.tutorIndividual)
  if (this.tutorIndividual) {
    // Cargar los datos del tutor en el formulario
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
      dpi: this.tutorIndividual.dpi,
    });
    // Cambiar a modo edición
    this.isEditing = true;
  }
}
  get f() { return this.tutorForm.controls; }
}
