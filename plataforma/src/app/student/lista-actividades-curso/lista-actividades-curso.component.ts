import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DahboardService } from '../services/dahboard.service';

@Component({
  selector: 'app-lista-actividades-curso',
  templateUrl: './lista-actividades-curso.component.html',
  styleUrls: ['./lista-actividades-curso.component.css']
})
export class ListaActividadesCursoComponent implements OnInit {
  idCurso:any= []



  constructor(private ruta:ActivatedRoute, private calendarioservice:DahboardService) { }

  ListaActividadesEventos:any=[];
  EventsDatos: any = []

  Enero:any=[]
  Febrero:any=[]
  Marzo:any=[]
  Abril:any=[]
  Mayo:any=[]
  Junio:any=[]
  Julio:any=[]
  Agosto:any=[]
  Septiembre:any=[]
  Octubre:any=[]
  Noviembre:any=[]
  Diciembre:any=[]

  ngOnInit(): void {
    this.idCurso = this.ruta.snapshot.paramMap.get('id');
    this.obtenerDatosActividades(this.idCurso);
  }


  obtenerDatosActividades(idCurso:any){
    this.calendarioservice.getActividadesCurso(idCurso).subscribe(
      response=>{
        this.ListaActividadesEventos=response
        for(let i =0; i<this.ListaActividadesEventos.length; i++){
          const fechaObjeto = new Date(this.ListaActividadesEventos[i].fecha_entrega);
          const mes = fechaObjeto.getMonth() + 1; // Los meses en JavaScript son 0-indexados
          this.EventsDatos[i]={
            title:this.ListaActividadesEventos[i].nombre_actividad,
            date:this.ListaActividadesEventos[i].fecha_entrega,
            description:this.ListaActividadesEventos[i].detalle,
            color: this.ListaActividadesEventos[i].color_curso,
            url: '#/student/curso/resumen/' +this.ListaActividadesEventos[i].idCurso+'/' + this.ListaActividadesEventos[i].nombre_curso,
            newDate: mes
          }
        }
        this.SepararMeses();
        console.log(this.EventsDatos)
      },
      error=>{
        console.log('Error: '+error);
      }
    )
  }

  //Switch de meses
  SepararMeses(){
    for(let i=0; i<this.EventsDatos.length; i++){
      const dif = this.EventsDatos[i].newDate
    switch(dif){
      case 1:
         this.Enero.push(this.EventsDatos[i])
         //console.log(this.Enero)
         break;

      case 2:
         this.Febrero.push(this.EventsDatos[i])
         //console.log(this.Febrero)
         break;

      case 3:
         this.Marzo.push(this.EventsDatos[i])
         console.log(this.Marzo)
         break;

      case 4:
         this.Abril.push(this.EventsDatos[i])
         //console.log(this.Abril)
         break;

      case 5:
         this.Mayo.push(this.EventsDatos[i])
         //console.log(this.Mayo)
         break;

      case 6:
         this.Junio.push(this.EventsDatos[i])
         //console.log(this.Junio)
         break;

      case 7:
         this.Julio.push(this.EventsDatos[i])
         //console.log(this.Julio)
         break;

      case 8:
         this.Agosto.push(this.EventsDatos[i])
         //console.log(this.Agosto)
         break;

      case 9:
         this.Septiembre.push(this.EventsDatos[i])
         //console.log(this.Septiembre)
         break;

      case 10:
         this.Octubre.push(this.EventsDatos[i])
         //console.log(this.Octubre)
         break;

      case 11:
         this.Noviembre.push(this.EventsDatos[i])
         //console.log(this.Noviembre)
         break;

      case 12:
         this.Diciembre.push(this.EventsDatos[i])
         //console.log(this.Diciembre)
         break;

      default:
        //console.log("No such day exists!");
        break;
    }
    }
  }



}
