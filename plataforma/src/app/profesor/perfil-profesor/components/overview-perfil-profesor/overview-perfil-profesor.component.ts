import { Component, OnInit, ElementRef } from '@angular/core';
import { PerfilProfesorService } from '../../services/perfil-profesor.service';

@Component({
  selector: 'app-overview-perfil-profesor',
  templateUrl: './overview-perfil-profesor.component.html',
  styleUrls: ['./overview-perfil-profesor.component.css']
})
export class OverviewPerfilProfesorComponent implements OnInit {

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

  constructor(private elementRef:ElementRef, private PerfilProfesoresService: PerfilProfesorService) {}

  ngOnInit(): void {
    this.obtenerProfesores()
  }

  obtenerProfesores(){
    this.PerfilProfesoresService.getProfesores().subscribe(
      Response=>{
        this.profesoresGet=Response;
        this.errorServicio=''
      },
      error=>{
        this.errorServicio=error
      }
    )
  }

  editarProfesor(idProfesor:string){
    delete this.profesoresIndividual.idProfesor;
    this.PerfilProfesoresService.updateProfesor(idProfesor,this.profesoresIndividual).subscribe(
      response=>{
        this.obtenerProfesores();
      },
      error=>{
        console.log('Error '+error);
      }
    )
  }

}
