import { Component, OnInit, ElementRef} from '@angular/core';
import { BimestreService } from '../../../services/bimestres.service';
import { UnidadesService } from '../../../services/unidades.service';
import { EstadisticasDashboardService } from '../../../services/estadisticas-dashboard.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-admin-ajustes-unidad-dashboard',
  templateUrl: './ajustes-unidad.component.html',
  styleUrls: ['./ajustes-unidad.component.css']
})
export class AjustesUnidadComponent implements OnInit {
  sppinerOn:boolean=true; //Unidades
  sppinerOn2:boolean=true; //Ver estado notas
  sppinerOn3:boolean=true;  // Ingreso Alumnos, Profesores, Tutores
  sppinerOn4:boolean=true; //Estadisticas generales
  unidades:any =[];
  ActivoInactivo='cheked';
  errorServicio:any={};
  estadoUnidad:any={
    estado:''
  }
  EstadoProfesor:any={}
  EstadoAlumno:any={}
  EstadoTutor:any={}
  estado:any={}
  totalNinos:any=''
  totalNinas:any=''
  codigoActivo:any=''
  codigoInactivo:any=''
  passDocenteCambiada:any=''
  passDocenteNoCambiada:any=''

  estadoFinalAlumno=''
  estadoFinalProfesor=''
  estadoFinalTutor=''
  estadoFinalNotas=''

  constructor(private servicioBimestre:BimestreService,private estadisticaService:EstadisticasDashboardService, private elementRef: ElementRef,private unidadesService:UnidadesService) { }

  ngOnInit(): void {
    this.getUnidades();
    this.getNinosNinas();
    this.getCodigoActivoInactivo();
    this.getPassChangeDocentes();
    this.getEstadoVerNotas();
    this.GetEstadoAlumnos();
    this.GetEstadoProfesor();
    this.GetEstadoTutor();
  }

  getEstadoVerNotas(){
    this.unidadesService.getNotasVer().subscribe(
      res=>{
        this.estado=res
        if(this.estado.noVer<this.estado.ver){
          this.estadoFinalNotas = '1';
        }else{
          this.estadoFinalNotas = '0';
        }
        this.sppinerOn2=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn2=false;
      }
    )
  }
  //Check Ver notas

  selectedCheckNotas(e:any) { // here e is a native event
    if(e.target.checked){
      this.estadoFinalNotas='1';
      this.unidadesService.habilitarVerNotas(this.estadoFinalNotas).subscribe(
        response=>{
          this.getEstadoVerNotas()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalNotas='0';
      this.unidadesService.habilitarVerNotas(this.estadoFinalNotas).subscribe(
        response=>{
          this.getEstadoVerNotas()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
  noselectedCheckNotas(e:any){
    if(!e.target.checked){
      this.estadoFinalNotas='0';
      this.unidadesService.habilitarVerNotas(this.estadoFinalNotas).subscribe(
        response=>{
          this.getEstadoVerNotas()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalNotas='1';
      this.unidadesService.habilitarVerNotas(this.estadoFinalNotas).subscribe(
        response=>{
          this.getEstadoVerNotas()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }



  //Gets
  getNinosNinas(){
    this.sppinerOn4=true;
    this.estadisticaService.getTotalAlumnosHombres().subscribe(
      res=>{
        this.totalNinos=res[0].nino
        this.sppinerOn4=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn4=false;
      }
    )
    this.sppinerOn4=true;
    this.estadisticaService.getTotalAlumnosMujeres().subscribe(
      res=>{
        this.totalNinas=res[0].nina
        this.sppinerOn4=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn4=false;
      }
    )
  }
  getPassChangeDocentes(){
    this.sppinerOn4=true;
    this.estadisticaService.getDocenteContrasenaCambiada().subscribe(
      res=>{
        this.passDocenteCambiada=res[0].siCambioContra
        this.sppinerOn4=false;
      },
      err=>{
       console.log(err)
       this.sppinerOn4=false;
      }
    )
    this.estadisticaService.getDocenteContrasenaNoCambiada().subscribe(
      res=>{
        this.passDocenteNoCambiada=res[0].noCambioContra
        this.sppinerOn4=false;
      },
      err=>{
       console.log(err)
       this.sppinerOn4=false;
      }
    )
  }
  getCodigoActivoInactivo(){
    this.sppinerOn4=true;
    this.estadisticaService.getTotalCodigosUso().subscribe(
      res=>{
        this.codigoActivo=res[0].activo
        this.sppinerOn4=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn4=false;
      }
    )
    this.sppinerOn4=true;
    this.estadisticaService.getTotalCodigosNoUso().subscribe(
      res=>{
        this.codigoInactivo=res[0].noActivo
        this.sppinerOn4=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn4=false;
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

  //Estados Usuarios
  GetEstadoAlumnos(){
    this.sppinerOn=true;
    this.unidadesService.getEstadoAlumno().subscribe(
      res=>{
        this.EstadoAlumno=res
        if(this.EstadoAlumno.noActivo<this.EstadoAlumno.siActivo){
          this.estadoFinalAlumno = '1';
        }else{
          this.estadoFinalAlumno = '0';
        }
        this.sppinerOn3=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn3=false;
      }
    )
  }
  GetEstadoProfesor(){
    this.sppinerOn3=true;
    this.unidadesService.getEstadoProfesor().subscribe(
      res=>{
        this.EstadoProfesor=res
        if(this.EstadoProfesor.noActivo<this.EstadoProfesor.siActivo){
          this.estadoFinalProfesor = '1';
        }else{
          this.estadoFinalProfesor = '0';
        }
        this.sppinerOn3=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn3=false;
      }
    )
  }
  GetEstadoTutor(){
    this.sppinerOn3=true;
    this.unidadesService.getEstadoTutor().subscribe(
      res=>{
        this.EstadoTutor=res
        if(this.EstadoTutor.noActivo<this.EstadoTutor.siActivo){
          this.estadoFinalTutor = '1';
        }else{
          this.estadoFinalTutor = '0';
        }
        this.sppinerOn3=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn3=false;
      }
    )
  }
//Checks de alumno
  selectedCheckAlumno(e:any) { // here e is a native event
    if(e.target.checked){
      this.estadoFinalAlumno='1';
      this.unidadesService.updateEstadoAlumno(this.estadoFinalAlumno).subscribe(
        response=>{
          this.GetEstadoAlumnos()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalAlumno='0';
      this.unidadesService.updateEstadoAlumno(this.estadoFinalAlumno).subscribe(
        response=>{
          this.GetEstadoAlumnos()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
  noselectedCheckAlumno(e:any){
    if(!e.target.checked){
      this.estadoFinalAlumno='0';
      this.unidadesService.updateEstadoAlumno(this.estadoFinalAlumno).subscribe(
        response=>{
          this.GetEstadoAlumnos()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalAlumno='1';
      this.unidadesService.updateEstadoAlumno(this.estadoFinalAlumno).subscribe(
        response=>{
          this.GetEstadoAlumnos()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }

  //Checks Profesor
  selectedCheckProfesor(e:any) { // here e is a native event
    if(e.target.checked){
      this.estadoFinalProfesor='1';
      this.unidadesService.updateEstadoProfesor(this.estadoFinalProfesor).subscribe(
        response=>{
          this.GetEstadoProfesor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalProfesor='0';
      this.unidadesService.updateEstadoProfesor(this.estadoFinalProfesor).subscribe(
        response=>{
          this.GetEstadoProfesor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
  noselectedCheckProfesor(e:any){
    if(!e.target.checked){
      this.estadoFinalProfesor='0';
      this.unidadesService.updateEstadoProfesor(this.estadoFinalProfesor).subscribe(
        response=>{
          this.GetEstadoProfesor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalProfesor='1';
      this.unidadesService.updateEstadoProfesor(this.estadoFinalProfesor).subscribe(
        response=>{
          this.GetEstadoProfesor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }

  //Checks Tutor
  selectedCheckTutor(e:any) { // here e is a native event
    if(e.target.checked){
      this.estadoFinalTutor='1';
      this.unidadesService.updateEstadoTutor(this.estadoFinalTutor).subscribe(
        response=>{
          this.GetEstadoTutor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalTutor='0';
      this.unidadesService.updateEstadoTutor(this.estadoFinalTutor).subscribe(
        response=>{
          this.GetEstadoTutor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
  noselectedCheckTutor(e:any){
    if(!e.target.checked){
      this.estadoFinalTutor='0';
      this.unidadesService.updateEstadoTutor(this.estadoFinalTutor).subscribe(
        response=>{
          this.GetEstadoTutor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }else{
      this.estadoFinalTutor='1';
      this.unidadesService.updateEstadoTutor(this.estadoFinalTutor).subscribe(
        response=>{
          this.GetEstadoTutor()
        },
        error=>{
          this.errorServicio=error
        }
      )
    }
  }
}
