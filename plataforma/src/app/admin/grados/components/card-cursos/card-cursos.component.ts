import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesoresService } from 'src/app/admin/dashboard/components/services/profesores.service';

@Component({
  selector: 'app-card-cursos-grado-admin',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.css']
})
export class CardCursosComponent implements OnInit {
  idGrado:string=''
  filterValue:string=''
  listaCursos:any=[]
  listaDocentes:any=[]
  dataTable: any;
  cursosPorPagina=15;
  dataSource:any=[]
  errorService:any={
    codigoError:''
  };
  sppinerOn:boolean=true;
  //variables para errores
  cursoVacioError='form-control';
  @Input() cursos:any=[{}];
  @Input() secciones:any=[{}];
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()

  constructor(private profesoresService:ProfesoresService,private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGrado=params['id'];
    this.getDocentes()
    this.listaCursos=this.cursos
  }
  buscarCursoIndividual(idCurso:string){

  }
  crearCurso(){
    console.log(this.fecha)
  }
  getDocentes(){
    this.profesoresService.getProfesoresListaSelectCursos().subscribe(
      res=>{
        this.listaDocentes=res;
        this.sppinerOn=false;
      },
      err=>{
        console.log(err)
        this.sppinerOn=false;
      }
    )
  }
  }
