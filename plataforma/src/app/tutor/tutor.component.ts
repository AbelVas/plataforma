import { Component,OnInit } from "@angular/core";
import { TematutoresService } from "./dashboard/services/tematutores.service";

@Component({
  selector:'app-tutor',
  templateUrl:'./tutor.component.html',
  styleUrls:['./tutor.component.scss']
})
export class TutorComponent implements OnInit{

  temaactivo:string='1';

  temaGet:any=[];
  temaIndividual:any={
    idTema: '',
    idIconoAdmin: '',
    idIconoTutor: '',
    idIconoProfesor: '',
    idIconoEstudiante: '',
    nombre_tema: '',
    navbar1: '',
    navbar2: '',
    texto1: '',
    texto2: '',
    estado: ''
  }

  //variables de colores
  cnavbar1:string='';
  cnavbar2:string='';
  ctexto1:string='';
  ctexto2:string='';

  constructor( private tematutoresService:TematutoresService ){}

  ngOnInit(){
    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosTema(){
    this.tematutoresService.getTemaActivo(this.temaactivo).subscribe(
      response=>{
        var cantidad=response.length;
        this.temaGet=response;
        for(let i=0; i<cantidad; i++){
          this.cnavbar1=this.temaGet[i].navbar1;
          this.cnavbar2=this.temaGet[i].navbar2;
          this.ctexto2=this.temaGet[i].texto2;
        }
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }
}
