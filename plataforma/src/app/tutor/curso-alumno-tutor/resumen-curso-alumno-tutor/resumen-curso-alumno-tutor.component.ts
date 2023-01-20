import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VistaEstudianteService } from '../../service/vista-estudiante.service';
import { TematutoresService } from '../../service/tematutores.service';

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
    texto1: '',
    estado: ''
  }

  //variables de colores
  cfondo1:string='';
  ctexto1:string='';

  constructor(private vistaEstudianteService:VistaEstudianteService, private activedRoute:ActivatedRoute, private tematutoresService:TematutoresService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.iddelCurso=params['idCurso'];
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet

    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
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

  obtenerDatosTema(){
    this.tematutoresService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cfondo1=this.temaGet[i].fondo1;
          this.ctexto1=this.temaGet[i].texto1;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

}
