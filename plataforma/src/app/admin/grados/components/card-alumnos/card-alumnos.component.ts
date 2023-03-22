import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CodigosService } from 'src/app/admin/services/codigos.service';
import { GradosAlumnosService } from 'src/app/admin/services/grados-alumnos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-alumnos-grado-admin',
  templateUrl: './card-alumnos.component.html',
  styleUrls: ['./card-alumnos.component.css']
})
export class CardAlumnosComponent implements OnInit {
  listaAlumnos:any=[];
  idGrado:any=[];
  listaGradosSelect:any=[]
  alumnoIndividual:any={}
  isEditPassword:string='0'
  variable:string='1'
  isCorrectCodigo:boolean=false
  codigoError:string=''
  passNoCoincide:string=''
  alumnoPropiedadesCrear:any={
    imagen:'assets/img/blank_profile.png',
    activo:'1',
    idRol:'4',
    idCodigo:'',
    ver_notas:'1'
  }
  alumnoForm=this.formBuilder.group({
    nombres_alumno:new FormControl('',[Validators.required]),
    apellidos_alumno:new FormControl('',[Validators.required]),
    idGrado:new FormControl('',[Validators.required]),
    sexo:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required]),
    confirmPass:new FormControl('',[Validators.required])
  })
  alertaValor:any={
    classAlerta:'',
    mensajeAlerta:'',
    icon:''
  }
  classAlerta:string=''
  mensajeAlerta:string=''
  icon=''
  intervalo:any
  submitted=false;

  @ViewChild('cerrarEliminarModal') modalCloseEliminar: any;
  @ViewChild('cerrarCrearModal') modalCloseCrear: any;
  @ViewChild('cerrarEditarModal') modalCloseEditar: any;
  @ViewChild('CerrarAlerta') closeAlert: any;
  @Output() alerta=new EventEmitter<any>();

  constructor(private alumnosGradoService:GradosAlumnosService,private activedRoute:ActivatedRoute, private codigoService:CodigosService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    const params=this.activedRoute.snapshot.params;
    if(params['id']!=null){
      this.idGrado=params['id']
    }
    this.getAlumnos()
    console.log(this.idGrado)
  }
  getAlumnos(){
    this.alumnosGradoService.getAlmunosGrado(this.idGrado).subscribe(
      res=>{
        this.listaAlumnos=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  verificaraCodigo(codigo:string){
    var dataCodigoAlumno:any={
      idTipoCodigo:'4',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoAlumno).subscribe(
      res=>{
        if(res==false){
          this.codigoError='border-danger'
        }else{
          this.isCorrectCodigo=true;
          this.alumnoPropiedadesCrear.idCodigo=res[0].idCodigo
        }
      },
      err=>{
        console.log(err)
      }
    )
  }
  crearAlumno(){}
  buscarAlumnoArray(idAlumno:string){
    this.alumnoIndividual=this.listaAlumnos.find((x:any)=>x.idAlumno===idAlumno)
  }
  get f() { return this.alumnoForm.controls; }

  editarAlumno(idAlumno:string){
    this.submitted = true;
    if ((this.f.pass.value!=this.f.confirmPass.value)) {
      this.passNoCoincide='border-danger'
      return;
    }
    var DatoAlumnoEditado:any={}
    if(this.f.nombres_alumno.value!=''){
      DatoAlumnoEditado.nombres_alumno=this.f.nombres_alumno.value
    }
    if(this.f.apellidos_alumno.value!=''){
      DatoAlumnoEditado.apellidos_alumno=this.f.apellidos_alumno.value
    }
    if(this.f.usuario.value!=''){
      DatoAlumnoEditado.usuario=this.f.usuario.value
    }
    if(this.f.pass.value!=''){
      DatoAlumnoEditado.pass=this.f.pass.value
    }
    if(Object.entries(DatoAlumnoEditado).length===0){
      this.modalCloseEditar.nativeElement.click();
      this.toastrService.warning(`Sin datos para modificar`,'Atención')
    }else{
      this.alumnosGradoService.editAlumno(idAlumno,DatoAlumnoEditado).subscribe(
        res=>{
          this.getAlumnos()
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.success(`Alumno Editado`,'Realizado')
        },
        err=>{
          this.modalCloseEditar.nativeElement.click();
          this.toastrService.error(`Alumno no Editado`,'Error')
        }
      )
    }
  }

  eliminarAlumno(idAlumno:string){
    this.alumnosGradoService.deleteAlumno(idAlumno).subscribe(
      res=>{
        this.modalCloseEliminar.nativeElement.click();
        this.alumnoForm.reset();
        this.isCorrectCodigo=false
        this.getAlumnos()
        this.toastrService.success(`Alumno Eliminado`,'Realizado')
      },
      err=>{
        this.toastrService.error(`Alumno no Eliminado`,'Error')
        console.log(err)
      }
    )
  }

  selectedCheck(e:any){
    if(e.target.checked){
      this.isEditPassword='1'
      return this.isEditPassword='1';
    }else{
      this.isEditPassword='0'
      return this.isEditPassword='0';
    }
  }
  noselectedCheck(e:any){
    if(e.target.checked==false){
      this.isEditPassword='0'
      return this.isEditPassword='0';
    }else{
      this.isEditPassword='1'
      return this.isEditPassword='1';
    }
  }


}
