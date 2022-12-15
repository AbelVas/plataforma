import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProfesoresService } from 'src/app/admin/dashboard/components/services/profesores.service';

@Component({
  selector: 'app-card-cursos-grado-admin',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.css']
})
export class CardCursosComponent implements OnInit {
  filterValue:string=''
  listaCursos:any=[]
  listaDocentes:any=[]
  dataTable: any;
  cursosPorPagina=15;
  dataSource:any=[]
  errorService:any={
    codigoError:''
  };
  //variables para errores
  cursoVacioError='form-control';
  @Input() cursos:any=[{}];
  @Input() secciones:any=[{}];

  constructor(private profesoresService:ProfesoresService) { }

  ngOnInit(): void {
    this.getDocentes()
    this.listaCursos=this.cursos
  }
  buscarCursoIndividual(idCurso:string){

  }
  crearCurso(){
    var hoy=new Date();
    var fecha=hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate()

    console.log(fecha)
  }
  getDocentes(){
    this.profesoresService.getProfesoresListaSelectCursos().subscribe(
      res=>{
        this.listaDocentes=res;
        console.log(this.listaDocentes)
      },
      err=>{
        console.log(err)
      }
    )
  }
  }
