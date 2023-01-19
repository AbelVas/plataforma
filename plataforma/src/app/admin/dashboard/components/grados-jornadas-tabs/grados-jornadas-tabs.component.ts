import { Component, OnInit } from '@angular/core';
import { SeccionesService } from 'src/app/admin/services/secciones.service';
import  {NivelesService} from 'src/app/admin/services/niveles.service'

@Component({
  selector: 'app-admin-grados-jornadas-tabs-dashboard',
  templateUrl: './grados-jornadas-tabs.component.html',
  styleUrls: ['./grados-jornadas-tabs.component.css']
})
export class GradosJornadasTabsComponent implements OnInit {
  nivelesMatutina:any=[];
  nivelesVespertina:any=[];
  NivelesExport:any=[]
  NivelesExportVespertina:any=[]
  secciones:any=[];
  SeccionesExport:any=[]
  constructor(private nivelesService:NivelesService,private seccionesService:SeccionesService) { }

  ngOnInit(): void {
    this.getNivelesMatutina();
    this.getSecciones()
    this.getNivelesVespertina()
  }
  getNivelesMatutina(){
    this.nivelesService.getNivelesJornadaMatutina().subscribe(
     res=>{
      this.nivelesMatutina=res;
      for(let i=0;i<this.nivelesMatutina.length;i++){
        this.NivelesExport[i]=this.nivelesMatutina[i]
      }
     },
     err=>{
      console.log('Error Niveles Mat: '+err)
     }
    )
    }
    getNivelesVespertina(){
      this.nivelesService.getNivelesJornadaVespertina().subscribe(
       res=>{
        this.nivelesVespertina=res;
        for(let i=0;i<this.nivelesVespertina.length;i++){
          this.NivelesExportVespertina[i]=this.nivelesVespertina[i]
        }
       },
       err=>{
        console.log('Error Niveles Vest: '+err)
       }
      )
      }
  getSecciones(){
    this.seccionesService.getSecciones().subscribe(
      res=>{
        this.secciones=res;
        for(let i=0;i<this.secciones.length;i++){
          this.SeccionesExport[i]=this.secciones[i]
        }
    },
    err=>{
      console.log('Error Jornadas: '+err)
    }
    )
  }
}
