import { Component, OnInit, ElementRef} from '@angular/core';
import { BimestreService } from '../../../services/bimestres.service';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-admin-ajustes-unidad-dashboard',
  templateUrl: './ajustes-unidad.component.html',
  styleUrls: ['./ajustes-unidad.component.css']
})
export class AjustesUnidadComponent implements OnInit {
  sppinerOn:boolean=true;
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

  constructor(private servicioBimestre:BimestreService,private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef) { }

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
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
    this.estadisticaService.getTotalAlumnosMujeres().subscribe(
      res=>{
        this.totalNinas=res[0].nina
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  getPassChangeDocentes(){
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe(
      res=>{
        this.passDocenteCambiada=res[0].siCambioContra
        this.sppinerOn=false;
      },
      err=>{
       console.log(err)
       this.sppinerOn=false;
      }
    )
    this.estadisticaService.getDocenteContrasenaNoCambiada().subscribe(
      res=>{
        this.passDocenteNoCambiada=res[0].noCambioContra
        this.sppinerOn=false;
      },
      err=>{
       console.log(err)
       this.sppinerOn=false;
      }
    )
  }
  getCodigoActivoInactivo(){
    this.estadisticaService.getTotalCodigosUso().subscribe(
      res=>{
        this.codigoActivo=res[0].activo
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
    this.estadisticaService.getTotalCodigosNoUso().subscribe(
      res=>{
        this.codigoInactivo=res[0].noActivo
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }

  getUnidades(){
    this.servicioBimestre.getUnidades().subscribe(
      response=>{
        this.unidades=response;
        this.errorServicio=''
        this.sppinerOn=false;
      },
      error=>{
        this.errorServicio=error
        console.log(this.errorServicio);
        this.sppinerOn=false;
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
