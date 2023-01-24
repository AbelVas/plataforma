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
  constructor(private estadisticaService:EstadisticasDashboardService) { }

  ngOnInit(): void {
    this.sppinerOn=true
    this.getTotalAlumnos()
    this.getTotalDocentes()
    this.getTotalGrados()
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
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }


}
