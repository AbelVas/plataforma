import { Component, OnInit } from '@angular/core';
import { BimestreService } from '../../containers/admin/dashboard/bimestres.service';

@Component({
  selector: 'app-admin-ajustes-unidad-dashboard',
  templateUrl: './ajustes-unidad.component.html',
  styleUrls: ['./ajustes-unidad.component.css']
})
export class AjustesUnidadComponent implements OnInit {
  unidades:any =[];
  ActivoInactivo='cheked';
  errorServicio:any={};
  estadoUnidad:any={
    estado:''
  }
  constructor(private servicioBimestre:BimestreService) { }

  ngOnInit(): void {
    this.getUnidades();
  }
  getUnidades(){
    this.servicioBimestre.getUnidades().subscribe(
      response=>{
        this.unidades=response;
        this.errorServicio=''
      },
      error=>{
        this.errorServicio=error
        console.log(this.errorServicio);
      }
    )
  }
  selectedCheck(e:any,idUnidad:string) { // here e is a native event
    if(e.target.checked){
      this.estadoUnidad.estado='1';
      this.servicioBimestre.updateUnidadesEstado(idUnidad,this.estadoUnidad).subscribe(
        response=>{
          this.getUnidades()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoUnidad.estado='0';
      this.servicioBimestre.updateUnidadesEstado(idUnidad,this.estadoUnidad).subscribe(
        response=>{
          this.getUnidades()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
  noselectedCheck(e:any,idUnidad:string){
    if(!e.target.checked){
      this.estadoUnidad.estado='0';
      this.servicioBimestre.updateUnidadesEstado(idUnidad,this.estadoUnidad).subscribe(
        response=>{
          this.getUnidades()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoUnidad.estado='1';
      this.servicioBimestre.updateUnidadesEstado(idUnidad,this.estadoUnidad).subscribe(
        response=>{
          this.getUnidades()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
}
