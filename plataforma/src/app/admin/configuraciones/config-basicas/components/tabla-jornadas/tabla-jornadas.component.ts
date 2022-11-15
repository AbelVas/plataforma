import { Component, OnInit,ElementRef } from '@angular/core';
import { JornadasService } from '../../services/jornadas.service';

@Component({
  selector: 'app-admin-tabla-jornadas-config',
  templateUrl: './tabla-jornadas.component.html',
  styleUrls: ['./tabla-jornadas.component.css']
})
export class TablaJornadasComponent implements OnInit {
  jornadasGet:any=[];
  errorServicio:any={};
  jornadasIndividual:any={
    idJornada:'',
    jornada:''
  }
  jornadasInsert:any={
    jornada:''
  }


  constructor(private elementRef:ElementRef, private jornadaService:JornadasService) { }
  ngOnInit(): void {

    this.obtenerJornadas()
  }
  obtenerJornadas(){
    this.jornadaService.getJornadas().subscribe(
      response=>{
        this.jornadasGet=response;
        this.errorServicio=''
      },
      error=>{
        this.errorServicio=error
      }
    )
  }
  buscarJornadasArray(idNivel:string){
    this.jornadasIndividual=this.jornadasGet.find((x:any)=>x.idJornada===idNivel)
  }
  crearJornada(){
    this.jornadaService.insertJornada(this.jornadasInsert).subscribe(
      response=>{
        this.obtenerJornadas()
      },error=>{
        console.log(error)
      }
    )
  }
  eliminarJornada(idJornada:string){
    this.jornadaService.deleteJornada(idJornada).subscribe(
      response=>{
        this.obtenerJornadas();
      },
      error=>{
        console.log(error)
      }
    )
  }
  editarJornada(idJornada:string){
    delete this.jornadasIndividual.idJorndad;
    this.jornadaService.updateJornada(idJornada,this.jornadasIndividual).subscribe(
      response=>{
        this.obtenerJornadas();
      },
      error=>{
        console.log('Error '+error);
      }
    )
  }
}
