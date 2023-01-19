import { Component, OnInit } from '@angular/core';
import { BimestreService } from '../../../services/bimestres.service';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';

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
  totalNinos:any=''
  totalNinas:any=''
  codigoActivo:any=''
  codigoInactivo:any=''
  passDocenteCambiada:any=''
  passDocenteNoCambiada:any=''
  constructor(private servicioBimestre:BimestreService,private estadisticaService:EstadisticasDashboardService) { }

  ngOnInit(): void {
    this.getUnidades();
    this.getNinosNinas();
    this.getCodigoActivoInactivo();
    this.getPassChangeDocentes();
  }
  getNinosNinas(){
    this.estadisticaService.getTotalAlumnosHombres().subscribe(
      res=>{
        this.totalNinos=res[0].nino
      },
      err=>{
        console.log(err)
      }
    )
    this.estadisticaService.getTotalAlumnosMujeres().subscribe(
      res=>{
        this.totalNinas=res[0].nina
      },
      err=>{
        console.log(err)
      }
    )
  }
  getPassChangeDocentes(){
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe(
      res=>{
        this.passDocenteCambiada=res[0].siCambioContra
      },
      err=>{
       console.log(err)
      }
    )
    this.estadisticaService.getDocenteContrasenaNoCambiada().subscribe(
      res=>{
        this.passDocenteNoCambiada=res[0].noCambioContra
      },
      err=>{
       console.log(err)
      }
    )
  }
  getCodigoActivoInactivo(){
    this.estadisticaService.getTotalCodigosUso().subscribe(
      res=>{
        this.codigoActivo=res[0].activo
      },
      err=>{
        console.log(err)
      }
    )
    this.estadisticaService.getTotalCodigosNoUso().subscribe(
      res=>{
        this.codigoInactivo=res[0].noActivo
      },
      err=>{
        console.log(err)
      }
    )
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
