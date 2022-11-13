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
  constructor(private servicioBimestre:BimestreService) { }

  ngOnInit(): void {
    this.getUnidades();
  }
  getUnidades(){
    this.servicioBimestre.getUnidades().subscribe(
      response=>{
        this.unidades=response;
        console.log(this.unidades);
      },
      error=>console.log(error)
    )
  }
}
