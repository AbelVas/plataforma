import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActividadesOpcionesCursoService } from '../../../../../services/actividades-opciones-curso.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recursos-opciones-curso',
  templateUrl: './recursos-opciones-curso.component.html',
  styleUrls: ['./recursos-opciones-curso.component.css']
})
export class RecursosOpcionesCursoComponent implements OnInit {

  constructor( private actividadesOpcionesCursoService:ActividadesOpcionesCursoService, private activedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService  ) { }
  listaRecursoCurso:any=[]
  submitted=false;

    //Formulario recurosweb
    crearRecursoForm=this.formBuilder.group({
      idUnidad:new FormControl('',[Validators.required]),
      titulo:new FormControl('',[Validators.required]),
      enlace:new FormControl('',[Validators.required]),
      descripcion:new FormControl(''),
    })

  RecursoIndividual:any={
    idtbRecursoVideo:'',
    titulo:'',
    descripcion:'',
    fecha_creacion:'',
    idCurso:'',
    idUnidad:'',
    enlace:''
  }
  RecursoIndividualEdit:any={
    idtbRecursoVideo:'',
    titulo:'',
    descripcion:'',
    fecha_creacion:'',
    idCurso:'',
    idUnidad:'',
    enlace:''
  }
  @ViewChild('eliminarRecursoModalCerrar') modalCloseEliminar: any;
  @ViewChild('editarRecursoCerrar') modalCloseEditar: any;
  @Input() idCurso:any=''

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idCurso=params['idCurso'];
    this.getRecursosPorGrado()
  }

  getRecursosPorGrado(){
    this.actividadesOpcionesCursoService.getRecursosCurso(this.idCurso).subscribe(
      res=>{
        this.listaRecursoCurso=res;
        console.log(this.listaRecursoCurso)
      },
      err=>{
        console.log(err)
      }
    )
  }

  buscarActividadArray(idtbRecursoVideo:string){
    this.RecursoIndividual=this.listaRecursoCurso.find((x:any)=>x.idtbRecursoVideo===idtbRecursoVideo)
    this.RecursoIndividualEdit=this.listaRecursoCurso.find((x:any)=>x.idtbRecursoVideo===idtbRecursoVideo)

  }

  eliminarActividad(idtbRecursoVideo:string){
    this.actividadesOpcionesCursoService.deleteRecurso(idtbRecursoVideo).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.submitted = false;
        this.crearRecursoForm.reset();
          this.getRecursosPorGrado();
          this.toastrService.success(`Recurso Eliminado`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Recurso no Eliminado`,'Error')
      }
    )
  }


  editarRecurso(idtbRecursoVideo:string){
    //eliminamos lo que no sirve del arreglo, dejamos solo los datos que necesita la tabla tbDetalleActividades
    delete this.RecursoIndividualEdit.idunidad
    delete this.RecursoIndividualEdit.idtbRecursoVideo
    delete this.RecursoIndividualEdit.fecha_creacion

    //delete this.ActividadIndividualEdit.disponible
    //delete this.ActividadIndividualEdit.entrega_fuera_fecha
    console.log(this.RecursoIndividualEdit);

    this.actividadesOpcionesCursoService.updateRecurso(idtbRecursoVideo,this.RecursoIndividualEdit).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getRecursosPorGrado()
        this.toastrService.success(`Actividad Editada`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Actividad no Editada`,'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }
}
