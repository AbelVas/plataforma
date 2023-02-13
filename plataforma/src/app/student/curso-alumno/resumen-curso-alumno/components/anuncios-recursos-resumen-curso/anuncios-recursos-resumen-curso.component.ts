import { Component, OnInit, Input } from '@angular/core';
import { ResumenCursoAlumnoService } from 'src/app/student/services/resumen-curso-alumno.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anuncios-recursos-resumen-curso',
  templateUrl: './anuncios-recursos-resumen-curso.component.html',
  styleUrls: ['./anuncios-recursos-resumen-curso.component.css']
})
export class AnunciosRecursosResumenCursoComponent implements OnInit {

  constructor( private resumenCursoAlumnoService:ResumenCursoAlumnoService, private toastrService:ToastrService, private activedRoute:ActivatedRoute ) { }
  listaRecursoCurso:any=[]
  RecursoIndividual:any={
    idtbRecursoVideo:'',
    titulo:'',
    descripcion:'',
    fecha_creacion:'',
    idCurso:'',
    idUnidad:'',
    enlace:''
  }
  @Input() idCurso:any=''

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idCurso=params['id'];
    this.getRecursosPorGrado()
  }

  getRecursosPorGrado(){
    this.resumenCursoAlumnoService.getRecursosCurso(this.idCurso).subscribe(
      res=>{
        this.listaRecursoCurso=res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  buscarActividadArray(idtbRecursoVideo:string){
    this.RecursoIndividual=this.listaRecursoCurso.find((x:any)=>x.idtbRecursoVideo===idtbRecursoVideo)

  }

}
