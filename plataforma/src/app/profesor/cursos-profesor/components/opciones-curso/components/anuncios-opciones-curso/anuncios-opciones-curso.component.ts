import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActividadesOpcionesCursoService } from '../../../../../services/actividades-opciones-curso.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anuncios-opciones-curso',
  templateUrl: './anuncios-opciones-curso.component.html',
  styleUrls: ['./anuncios-opciones-curso.component.css']
})
export class AnunciosOpcionesCursoComponent implements OnInit {

  constructor( private actividadesOpcionesCursoService:ActividadesOpcionesCursoService, private activedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService ) { }

  listaAnuncioCurso:any=[]
  submitted=false;

    //Formulario anuncios
    crearAnuncioForm=this.formBuilder.group({
      idUnidad:new FormControl('',[Validators.required]),
      nombre_anuncio:new FormControl('',[Validators.required]),
      anuncio:new FormControl('',[Validators.required])
    })

  AnuncioIndividual:any={
    idAnuncio:'',
    nombre_anuncio:'',
    fecha_anuncio:'',
    idCurso:'',
    idUnidad:'',
    anuncio:''
  }
  AnuncioIndividualEdit:any={
    idAnuncio:'',
    nombre_anuncio:'',
    fecha_anuncio:'',
    idCurso:'',
    idUnidad:'',
    anuncio:''
  }
  @ViewChild('eliminarAnuncioModalCerrar') modalCloseEliminar: any;
  @ViewChild('editarAnuncioCerrar') modalCloseEditar: any;
  @Input() idCurso:any=''

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idCurso=params['idCurso'];
    this.getAnunciosPorGrado()
  }

  getAnunciosPorGrado(){
    this.actividadesOpcionesCursoService.getAnunciosCurso(this.idCurso).subscribe(
      res=>{
        this.listaAnuncioCurso=res;
        //console.log(this.listaAnuncioCurso)
      },
      err=>{
        console.log(err)
      }
    )
  }

  buscarActividadArray(idAnuncio:string){
    this.AnuncioIndividual=this.listaAnuncioCurso.find((x:any)=>x.idAnuncio===idAnuncio)
    this.AnuncioIndividualEdit=this.listaAnuncioCurso.find((x:any)=>x.idAnuncio===idAnuncio)

  }

  eliminarActividad(idAnuncio:string){
    this.actividadesOpcionesCursoService.deleteAnuncio(idAnuncio).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.submitted = false;
        this.crearAnuncioForm.reset();
          this.getAnunciosPorGrado();
          this.toastrService.success(`Anuncio Eliminado`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Anuncio no Eliminado`,'Error')
      }
    )
  }

  editarAnuncio(idAnuncio:string){
    //eliminamos lo que no sirve del arreglo, dejamos solo los datos que necesita la tabla tbDetalleActividades
    delete this.AnuncioIndividualEdit.idunidad
    delete this.AnuncioIndividualEdit.idAnuncio
    delete this.AnuncioIndividualEdit.fecha_anuncio

    //delete this.ActividadIndividualEdit.disponible
    //delete this.ActividadIndividualEdit.entrega_fuera_fecha

    this.actividadesOpcionesCursoService.updateAnuncio(idAnuncio,this.AnuncioIndividualEdit).subscribe(
      res=>{
        this.modalCloseEditar.nativeElement.click();
        this.getAnunciosPorGrado()
        this.toastrService.success(`Anuncio Editado`,'Realizado')
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Anuncio no Editado`,'Error')
      }
    )
    //this.modalCloseEditar.nativeElement.click();
  }

}
