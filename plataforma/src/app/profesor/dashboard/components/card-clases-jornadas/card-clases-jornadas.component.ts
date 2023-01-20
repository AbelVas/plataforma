import { Component, OnInit, Input } from '@angular/core';
import decode from 'jwt-decode';
import { CardResumenService } from '../../../services/card-resumen.service';

@Component({
  selector: 'app-card-clases-jornadas',
  templateUrl: './card-clases-jornadas.component.html',
  styleUrls: ['./card-clases-jornadas.component.css']
})
export class CardClasesJornadasComponent implements OnInit {
  sppinerOn:boolean=true;
  token:any=localStorage.getItem('Acces-Token');
  cursosGet:any=[];
  cursosIndividual:any={
    idProfesor:'',
    idCurso:'',
    idGrado:'',
    nombre_grado:'',
    nivel:'',
    idJornada:'',
    seccion:'',
    jornada:'',
    nombre_curso:''
  };
  matutina:any=[];
  vespertina:any=[];

  @Input() cfondo2:string='';
  @Input() ctexto1:string='';

  constructor( public cardResumenService:CardResumenService ) { }

  ngOnInit(): void {
    this.obtenerDatosCursos();
    this.cursosIndividual=this.cursosGet
  }

  obtenerDatosCursos(){
    const {idUsuario}:any=decode(this.token);
    this.cardResumenService.getCursoporProfesor(idUsuario).subscribe(
      response=>{
        this.sppinerOn=false;
        var cantidad=response.length
        this.cursosGet=response;
        var AuxMatutina=0;
        var AuxVespertina=0;
        for(let i = 0; i<cantidad; i++){
          if(this.cursosGet[i].idJornada=='1'){
            this.matutina[AuxMatutina]=this.cursosGet[i]
            AuxMatutina++;
          }else{
            this.vespertina[AuxVespertina]=this.cursosGet[i]
            AuxVespertina++;
          }
        }
      },
      error=>{
        console.log('Error: '+error);
        this.sppinerOn=false;
      }
    )
  }

}
