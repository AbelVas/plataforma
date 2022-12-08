import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ListarGradosXJornadaService } from 'src/app/admin/services/listar-grados-x-jornada.service';




@Component({
  selector: 'app-card-matutina-admin-grados-jornadas',
  templateUrl: './card-matutina.component.html',
  styleUrls: ['./card-matutina.component.css']
})
export class CardMatutinaComponent implements OnInit {
  gradosLista:any=[];
  dataTable: any;
  gradosListaObject: any={};
  errorServicio:any={};



  constructor(private jornadaGrado:ListarGradosXJornadaService) { }

  ngOnInit(): void {

    this.getGradosMatutina()

  }
  getGradosMatutina(){

    const idJornada='1';
    this.jornadaGrado.getGradoJornada(idJornada).subscribe(
      res=>{
        this.gradosLista=res;
        console.log(this.gradosLista);
        this.errorServicio='no'
      },
      err=>{
        this.errorServicio=err;
      }
    )
  }
}
