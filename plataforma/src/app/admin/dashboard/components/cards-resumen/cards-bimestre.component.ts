import { Component, OnInit } from '@angular/core';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';

@Component({
  selector: 'app-admin-cards-bimestre-dashboard',
  templateUrl: './cards-bimestre.component.html',
  styleUrls: ['./cards-bimestre.component.css']
})
export class CardsBimestreComponent implements OnInit {
  sppinerOn:boolean=true;
  totalAlumnos:any='';
  totalDocentes:any='';
  totalGrados:any=''
  almacenamientoEnBytes:any
  almacenamientoEnGigas: any
  porcentajeAlmacenamiento:any
  constructor(private estadisticaService:EstadisticasDashboardService) { }

  ngOnInit(): void {
    this.sppinerOn=true
    this.getTotalAlumnos()
    this.getTotalDocentes()
    this.getTotalGrados()
    this.getEspacioConsumo()
  }
  getTotalAlumnos(){
    this.estadisticaService.getTotalAlumnos().subscribe(
      res=>{
        this.totalAlumnos=res[0].CantidadAlumnos
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  getTotalDocentes(){
    this.estadisticaService.getCantidadDocentes().subscribe(
      res=>{
        this.totalDocentes=res[0].CantidadProfesores
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  getTotalGrados(){
    this.estadisticaService.getCantidadGrados().subscribe(
      res=>{
        this.totalGrados=res[0].CantidadGrados
        this.sppinerOn=false;
      },
      err=>{
        this.sppinerOn=false;
      }
    )
  }
  getEspacioConsumo(){
    this.estadisticaService.getAlmacenamientoPlataforma().subscribe(
      res=>{
        var gigas=1e9
        this.almacenamientoEnBytes=res[0].almacenamiento_ocupado
        this.almacenamientoEnGigas=parseFloat((this.almacenamientoEnBytes/gigas).toFixed(3))
         // Verifica si almacenamientoEnGigas es igual a 60
         if (this.almacenamientoEnGigas === 60) {
          // Si es igual a 60, muestra el porcentaje del 100%
          this.porcentajeAlmacenamiento = 100;
        } else {
          // Calcula el porcentaje según el valor almacenamientoEnGigas respecto a 60
          this.porcentajeAlmacenamiento =parseFloat(((this.almacenamientoEnGigas / 60) * 100).toFixed(1));
        }
      },
      err=>{
        this.sppinerOn=false;
      }
    )
  }

}
