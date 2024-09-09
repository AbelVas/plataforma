import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../components/auth-service.service";
import decode from "jwt-decode"
import { FormsModule,FormBuilder, FormControl,Validators } from "@angular/forms";
import { CodigosService } from "src/app/admin/services/codigos.service";
import { GradosService } from "src/app/admin/services/grados-admin.service";
import { AlumnosService } from "src/app/admin/services/alumnos.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  sppinerOn:boolean=false;
  listaGrados:any=[]
  alumnoForm=this.formBuilder.group({
    idGrado:new FormControl('',[Validators.required]),
    nombres_alumno:new FormControl('',[Validators.required]),
    apellidos_alumno:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    carnet:new FormControl(''),
    pass:new FormControl('',[Validators.required]),
    confirmPass:new FormControl('',[Validators.required])
  })
  loginForm=this.formBuilder.group({
    usuario:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required])
  })

  submitted=false;
  passNoCoincide:string=''
  guardado:boolean=false;
  codigoError:any
  registrarse:boolean=false;
  alertaError='0';
  alertaCreadoCorrecto:any='3'
  subido:boolean=false
  errorLogininputs='form-control form-control-lg'
  isCorrectCodigo:boolean=false
  AlumnoPropiedadesCrear:any={
    creado:'2023-01-30',
    activo:'1',
    ver_notas:'1',
    imagen:'assets/img/blank_profile.png',
    idRol:'4',
    idCodigo:'',
    idTutor:'1',
    sexo:'1'
  }
  constructor(private router:Router,private loginService:LoginService,private formBuilder:FormBuilder,private codigoService:CodigosService,private gradosService:GradosService, private alumnoService:AlumnosService){}
  ngOnInit(){

  }
  verificarCodigo(codigo:any){
    var dataCodigoAlumno:any={
      idTipoCodigo:'3',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoAlumno).subscribe(
      res=>{
        console.log(res)
        if(res==false){
          this.codigoError='border-danger'
        }else{
          this.isCorrectCodigo=true;
          this.AlumnoPropiedadesCrear.idCodigo=res[0].idCodigo
        }
        this.getGrados()
      },
      err=>{
        console.log(err)
      }
    )
  }
  getGrados(){
    this.gradosService.getGrados().subscribe(
      res=>{
        this.listaGrados=res;
      },
      err=>{
        console.log(err)
      }
    )
  }
  inicioRegistro(){
    this.registrarse=true
  }
  salirRegistro(){
    this.registrarse=false
    this.isCorrectCodigo=false
  }
  register(){
    this.subido=true
    this.submitted = true;
    if (this.alumnoForm.invalid||(this.f.pass.value!=this.f.confirmPass.value)) {
      this.passNoCoincide='border-danger'
      return;
    }
    var alumnoInsert:any={}
    alumnoInsert=Object.assign(this.alumnoForm.value,this.AlumnoPropiedadesCrear)
    delete alumnoInsert.confirmPass
    this.alumnoService.insertAlumno(alumnoInsert).subscribe(
      res=>{
        this.alumnoForm.reset();
        this.router.navigate(['admin']);
        console.log(alumnoInsert)
        this.alertaCreadoCorrecto='1'
        this.salirRegistro()
      },
      err=>{
        this.alertaCreadoCorrecto='0'
      }
    )
  }

  loginIn(){
    this.sppinerOn=true;
    if (this.loginForm.invalid) {
      this.sppinerOn=false;
      this.errorLogininputs='form-control form-control-lg border-danger';
      this.alertaError='1'
      return;
    }
    var loginData:any={}
    loginData=Object.assign(this.loginForm.value)
    this.loginService.login(loginData).subscribe((res:any)=>{
        localStorage.setItem('Acces-Token',res.token);
        const {idRol}:any=decode(res.token);
        if(idRol==1){
          this.sppinerOn=false;
          this.router.navigate(['admin']);
        }else if(idRol==2){
          this.sppinerOn=false;
          this.router.navigate(['teacher']);
        }else if(idRol==3){
          this.sppinerOn=false;
          this.router.navigate(['tutor']);
        }else if(idRol==4){
          this.sppinerOn=false;
          this.router.navigate(['student']);
        }
      },
      error=>{
        console.log(error)
        this.sppinerOn=false;
        this.errorLogininputs='form-control form-control-lg border-danger';
        this.alertaError='1'
      }
    )
  }
  get f() { return this.alumnoForm.controls; }
  get g(){ return this.loginForm.controls;}
}
