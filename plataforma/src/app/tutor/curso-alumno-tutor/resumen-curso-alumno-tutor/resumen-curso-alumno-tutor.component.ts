import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistaEstudianteService } from '../../vista-estudiante/services/vista-estudiante.service';

@Component({
  selector: 'app-resumen-curso-alumno-tutor',
  templateUrl: './resumen-curso-alumno-tutor.component.html',
  styleUrls: ['./resumen-curso-alumno-tutor.component.css']
})
export class ResumenCursoAlumnoTutorComponent implements OnInit {

  iddelCurso:string='';
  cursosGet:any=[];
  cursosIndividual:any={
    nombre_curso:'',
    nombre_profesor:'',
    apellido_profesor:'',
    nombre_grado:'',
    seccion:''
  };

  constructor(private vistaEstudianteService:VistaEstudianteService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.iddelCurso=params['idCurso'];
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet
  }

  obtenerDatosCursos(idCurso=this.iddelCurso){
    this.vistaEstudianteService.getCurso(idCurso).subscribe(
      response=>{
        this.cursosGet=response;
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
