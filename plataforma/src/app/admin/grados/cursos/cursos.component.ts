import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  idNivelSeleccionado:string=''
  idCurso:any='';
  idGrado:any='';
  idProfesor:any=''
  constructor(private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['idNivelLista']!=null){
      this.idNivelSeleccionado=params['idNivelLista'];
    }
    this.idCurso=params['id'];
    this.idGrado=params['idGrado'];
    this.idProfesor=params['idProfesor'];
    //
  }
}
