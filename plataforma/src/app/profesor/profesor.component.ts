import { Component,OnInit } from "@angular/core";
import { TemaProfesorService } from "./services/tema-profesor.service";

@Component({
  selector:'app-profesor',
  templateUrl:'./profesor.component.html',
  styleUrls:['./profesor.component.scss']
})
export class ProfesorComponent implements OnInit{

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
    texto2: '',
    estado: ''
  }

  //variables de colores
  cnavbar1:string='';
  cnavbar2:string='';
  ctexto2:string='';

  constructor( private temaProfesorService:TemaProfesorService ){}

  ngOnInit(){
    this.obtenerDatosTema();
    this.temaIndividual=this.temaGet
  }

  obtenerDatosTema(){
    this.temaProfesorService.getTemaActivo(this.temaactivo).subscribe(
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
