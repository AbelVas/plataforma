import { Component, OnInit,ElementRef } from '@angular/core';
import { NivelesService } from '../../services/niveles.service';

@Component({
  selector: 'app-tabla-niveles',
  templateUrl: './tabla-niveles.component.html',
  styleUrls: ['./tabla-niveles.component.css']
})
export class TablaNivelesComponent implements OnInit {
  nivelesGet:any=[];
  errorServicio:any={};
  nivelIndividual:any={
    idJornada:'',
    nivel:''
  }
  nivelInsert:any={
    idJonada:'',
    nivel:''
  }

  constructor(private nivelesService:NivelesService) { }

  ngOnInit(): void {
    this.obtenerNiveles();
  }
  obtenerNiveles(){
    this.nivelesService.getNiveles().subscribe(
      response=>{
        this.nivelesGet=response;
        this.errorServicio=''
      },
      error=>{
        this.errorServicio=error
      }
    )
  }
  buscarNivelesArray(idNivel:string){
    this.nivelIndividual=this.nivelesGet.find((x:any)=>x.idNivel===idNivel)
  }
  buscarNivelArray(idNivel:string){
    this.nivelIndividual=this.nivelesGet.find((x:any)=>x.idNivel===idNivel)
  }
  eliminarNivel(idNivel:string){
    console.log(idNivel);
  }
  editarNivel(idNivel:string){
    console.log(idNivel);
  }
  crearNivel(){

  }

}
