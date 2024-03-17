import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActividadesOpcionesCursoService } from 'src/app/profesor/services/actividades-opciones-curso.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardResumenService } from 'src/app/profesor/services/card-resumen.service';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.css']
})
export class AlumnosCursoComponent implements OnInit {

  constructor( public cardResumenService:CardResumenService, private activedRoute:ActivatedRoute, private elementRef: ElementRef, private actividadesOpcionesCursoService:ActividadesOpcionesCursoService, private formBuilder:FormBuilder, private toastrService:ToastrService ) { }
  public AreaCkeditor = ClassicEditor;
  sppinerOn:boolean=true;
  idGradoCurso:string='';
  alumnosGet:any=[
  ];
  EventosChart:any=[];
  Sex:any=[]
  alumnosIndividual:any={
    idAlumno:'',
    alumno:'',
    usuario:'',
    activo:''
  }
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];

  //Anuncios
  value: string='';
  listaAnuncioCurso:any=[]
  submitted=false;
  unidadesModal:any=[];

    //Formulario tareas
    crearTareaForm=this.formBuilder.group({
      idUnidad:new FormControl('',[Validators.required]),
      nombre_actividad:new FormControl('',[Validators.required]),
      fecha_entrega:new FormControl('',[Validators.required]),
      valor:new FormControl('',[Validators.required]),
      detalle:new FormControl(''),
      cotejo:new FormControl(''),
    })

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
    anuncio:'',
    unidad:''
  }
  AnuncioIndividualEdit:any={
    idAnuncio:'',
    nombre_anuncio:'',
    fecha_anuncio:'',
    idCurso:'',
    idUnidad:'',
    anuncio:'',
    unidad:''
  }
  @ViewChild('eliminarAnuncioModalCerrar') modalCloseEliminar: any;
  @ViewChild('editarAnuncioCerrar') modalCloseEditar: any;
  @ViewChild('crearAnuncioCerrar') modalCloseCrearAnuncio: any;
  @Input() idCurso:any=''
  //fecha para hoy
  hoy:any=new Date();
  mesActual=this.hoy.getMonth()+1;
  fecha=this.hoy.getFullYear()+'-'+this.mesActual+'-'+this.hoy.getDate()

  tareaCreadaObj:any=[];

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    this.idGradoCurso=params['idGrado'];
    this.idCurso=params['idCurso'];
    this.getUnidadesActivas();
    this.obtenerAlumnosCursos();
    this.getAnunciosPorGrado();


    this.cardResumenService.Prueba().subscribe((result: any) => {
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].nombre_grado);
          this.realdata.push(this.chartdata[i].CantidadAlumno);
        }
       }
      }
    )


    this.RenderChart(this.labeldata,this.realdata);
  }

  RenderChart(labeldata: any[], realdata: any[]) {
      const myChart = new Chart('pie1', {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Estudiantes por grado',
          data: realdata,
        }]
      },
      options: {
        scales: {
        }
      }
    });
  }

  obtenerAlumnosCursos(idGradoAl=this.idGradoCurso){
    this.cardResumenService.getAlumnosGrado(idGradoAl).subscribe(
      response=>{
        this.alumnosGet=response;
        this.sppinerOn=false;
        console.log(this.alumnosGet)

        }

    )
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
  get A() { return this.crearAnuncioForm.controls; }
  editarAnuncio(idAnuncio:string){
    //eliminamos lo que no sirve del arreglo, dejamos solo los datos que necesita la tabla tbDetalleActividades
    this.submitted=true;
    if (this.crearAnuncioForm.invalid) {
      this.toastrService.error(`Completar informacion restante`,'Error')
      return;
    }

    this.actividadesOpcionesCursoService.updateAnuncio(idAnuncio,this.crearAnuncioForm.value).subscribe(
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

  getUnidadesActivas(){
    this.actividadesOpcionesCursoService.getUnidadesActivas().subscribe(
      res=>{
        this.unidadesModal=res
      },
      err=>{
        console.log(err)
      }
    )
  }

  //para los forms siempre debemos traer los validadores
  get f() { return this.crearTareaForm.controls; }

  crearAnuncio(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.crearAnuncioForm.invalid) {
            return;
        }
        // display form values on success
        this.tareaCreadaObj=this.crearAnuncioForm.value
        this.tareaCreadaObj.idCurso=this.idCurso
        this.tareaCreadaObj.fecha_anuncio=this.fecha
      this.actividadesOpcionesCursoService.crearAnuncio(this.tareaCreadaObj).subscribe(
        res=>{
          this.modalCloseCrearAnuncio.nativeElement.click();
          this.submitted = false;
          this.crearAnuncioForm.reset();
          this.getAnunciosPorGrado()
          this.toastrService.success(`Anuncio Creado`,'Realizado')
        },
        err=>{
          console.log(err)
          this.toastrService.error(`Anuncio no Creado`,'Error')
        }
      )
  }
}

