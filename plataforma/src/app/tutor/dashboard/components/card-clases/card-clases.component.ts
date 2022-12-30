import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { CardClasesTutorService } from '../../services/card-clases-tutor.service';

@Component({
  selector: 'app-card-clases',
  templateUrl: './card-clases.component.html',
  styleUrls: ['./card-clases.component.css']
})
export class CardClasesComponent implements OnInit {
sppinerOn:boolean=true;
CursosLista:any=[];
CursoIndividual:any={}
CursoListaObject: any={};
dataSource:any;
errorServicio:any={};
errorService:any={
  codigoError:''
};

  constructor(public cardClasesTutorService:CardClasesTutorService) { }

  ngOnInit(): void {
    this.getCursosProfesor()
  }
  getCursosProfesor(){
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.cardClasesTutorService. getCursoporProfesor( idUsuario).subscribe(
      res=>{
        console.log(res)
        this.CursosLista=res;
        this.sppinerOn=false;
      },
      err=>{
        this.sppinerOn=false;
        this.errorServicio=err;
      }
    )
  }




}
