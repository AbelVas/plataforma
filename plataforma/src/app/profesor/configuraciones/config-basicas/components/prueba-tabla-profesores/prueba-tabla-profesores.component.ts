import { Component, OnInit, ElementRef } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'app-prueba-tabla-profesores',
  templateUrl: './prueba-tabla-profesores.component.html',
  styleUrls: ['./prueba-tabla-profesores.component.css']
})

export class TablaProfesoresComponent implements OnInit {
  profesoresGet:any=[];
  errorServicio:any=[];
  profesoresIndividual:any={
    idProfesor: '',
    idCodigo:'',
    nombre_profesor:'',
    apellido_profesor:'',
    telefono:'',
    CUI:'',
    usuario:'',
    fecha_nacimiento:''
  }
  profesoresInsert:any={
    profesor: ''
  }

  constructor(private elementRef:ElementRef, private profesorService:ProfesoresService) {}
  ngOnInit(): void {
    this.obtenerProfesores()
  }
  obtenerProfesores(){
    this.profesorService.getProfesores().subscribe(
      response=>{
        this.profesoresGet=response;
        this.errorServicio=''
        console.log(this.profesoresGet)
      },
      error=>{
        this.errorServicio.error
        console.log(error)
      }
    )
  }
  crearProfesor(){
    this.profesorService.insertProfesor(this.profesoresInsert).subscribe(
      response=>{
        this.obtenerProfesores()
      },error=>{
        console.log(error)
      }
    )
  }
  eliminarProfesor(idProfesor:string){
    this.profesorService.deleteProfesor(idProfesor).subscribe(
      response=>{
        this.obtenerProfesores();
      },error=>{
        console.log(error)
      }
    )
  }
  editarProfesor(idProfesor:string){
    delete this.profesoresIndividual.idProfesor;
    this.profesorService.updateProfesor(idProfesor,this.profesoresIndividual).subscribe(
      response=>{
        this.obtenerProfesores();
      },error=>{
        console.log('Error' +error);
      }
    )
  }
}
