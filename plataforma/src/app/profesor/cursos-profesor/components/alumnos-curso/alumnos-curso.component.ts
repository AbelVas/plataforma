import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardResumenService } from 'src/app/profesor/dashboard/services/card-resumen.service';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})
export class AlumnosCursoComponent implements OnInit {

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute ) { }

  idGradoCurso:string='';
  alumnosGet:any=[];
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.obtenerAlumnosCursos();
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
        console.log(this.alumnosGet)
      }
    )
  }

}
