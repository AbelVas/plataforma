import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosAlumnosGradosService } from './components/services/cursos-alumnos-grados.service';
import { GradosAlumnosService } from './components/services/grados-alumnos.service';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit {
  listaCursos:any=[];
  listaAlumnos:any=[];
  cursosExport:any=[];
  alumnosExport:any=[];
  constructor(private cursosGradosService:CursosAlumnosGradosService,private activedRoute:ActivatedRoute,private gradosAlumnosService:GradosAlumnosService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.getCursosProfesorGrado(params['id']);
    this.getAlumnosGrado(params['id']);
  }
    getCursosProfesorGrado(idGrado:string){
      this.cursosGradosService.getCursosGrado(idGrado).subscribe(
        res=>{
          this.listaCursos=res;
          for(let i=0;i<this.listaCursos.length;i++){
            this.cursosExport[i]=this.listaCursos[i]
          }
        },
        err=>{
          console.log(err)
        })
    }
    getAlumnosGrado(idGrado:string){
      this.gradosAlumnosService.getAlmunosGrado(idGrado).subscribe(
        res=>{
          this.listaAlumnos=res;
          for(let i=0;i<this.listaAlumnos.length;i++){
            this.alumnosExport[i]=this.listaAlumnos[i]
          }
        },
        err=>{
          console.log(err)
        }
      )
    }
}
