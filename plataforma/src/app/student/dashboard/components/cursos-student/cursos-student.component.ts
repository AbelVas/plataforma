import { Component, OnInit, Input } from '@angular/core';
import decode from 'jwt-decode';
import {DahboardService } from '../../../services/dahboard.service';

@Component({
  selector: 'app-cursos-student',
  templateUrl: './cursos-student.component.html',
  styleUrls: ['./cursos-student.component.css']
})
export class CursosStudentComponent implements OnInit {
  sppinerOn:boolean=true;
  CursosLista:any=[];
  errorServicio:any={};
  errorService:any={
    codigoError:''
  };

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  constructor(public cardClasesAlumnos:DahboardService) { }

  ngOnInit(): void {
    this.getCursosAlumno()
  }

  getCursosAlumno(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.cardClasesAlumnos.getCursoparaAlumno( idUsuario).subscribe(
      res=>{
        this.CursosLista = res.map((curso: any) => {
          // Verificar si ruta_imagen es nula y asignar un valor manual si es necesario
          if (!curso.ruta_imagen) {
            curso.ruta_imagen = 'assets/img/cursos/not-found/not-found-image.jpg';
          }
          return curso;
        });
        this.sppinerOn=false;
      },
      err=>{
        this.sppinerOn=false;
        this.errorServicio=err;
      }
    )
  }
}
