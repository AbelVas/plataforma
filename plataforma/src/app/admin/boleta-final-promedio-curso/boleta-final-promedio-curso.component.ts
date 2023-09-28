import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuadroFinalService } from '../services/cuadro-final.service';

@Component({
  selector: 'app-boleta-final-promedio-curso',
  templateUrl: './boleta-final-promedio-curso.component.html',
  styleUrls: ['./boleta-final-promedio-curso.component.css']
})
export class BoletaFinalPromedioCursoComponent implements OnInit {

  constructor(private activedRoute:ActivatedRoute,private cuadroGuia:CuadroFinalService) { }
  idGrado:any;
  idCurso:any;
  idProfesor:any;
  cursosIndividual:any={
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nombre_curso:'',
    abreviatura:'',
    color_curso:''
  };
  docenteCurso:any=[]
  GradoSeccion:any=[{}];
  tabla:any=[{}];

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['data']!=''){
      this.idGrado=params['idGrado']
      this.idCurso=params['idCurso']
      this.idProfesor=params['idProfesor']
    }
    this.cursoDocente()
    this.obtenerGradoSeccion()
    this.notasPromedioFinal()
  }

  notasPromedioFinal(){
    this.cuadroGuia.obtenerPromedioFinalNotas(this.idGrado,this.idCurso).subscribe(
      res=>{
        this.tabla=res
      },
      err=>{
        console.log(err)
      }
    )
  }

  obtenerGradoSeccion(){
    this.cuadroGuia.obtenerGradoSeccion(this.idGrado).subscribe(
      res=>{
        this.GradoSeccion=res
      },
      err=>{
        console.log(err)
      }
    )
  }

  cursoDocente(){
    this.cuadroGuia.cursoDocente(this.idCurso).subscribe(
      res=>{
        this.docenteCurso=res
      },
      err=>{
        console.log(err)
      }
    )
  }

  PrintThis(){
    window.print();
  }
}
