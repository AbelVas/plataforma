import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../components/auth-service.service";
import decode from "jwt-decode"
import { FormsModule,FormBuilder, FormControl,Validators, FormGroup } from "@angular/forms";
import { CodigosService } from "src/app/admin/services/codigos.service";
import { GradosService } from "src/app/admin/services/grados-admin.service";
import { AlumnosService } from "src/app/admin/services/alumnos.service";
import { ToastrService } from 'ngx-toastr';

//para cambiar el titulo en cada sección
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-login-nuevo',
  templateUrl: './login-nuevo.component.html',
  styleUrls: ['./login-nuevo.component.css']
})
export class LoginNuevoComponent implements OnInit {
  //Carga de Info
  sppinerOn:boolean=false;
  listaGrados:any=[]

  //Form Para añadir un estudiante
  alumnoForm=this.formBuilder.group({
    idGrado:new FormControl('',[Validators.required]),
    nombres_alumno:new FormControl('',[Validators.required]),
    apellidos_alumno:new FormControl('',[Validators.required]),
    usuario:new FormControl('',[Validators.required]),
    carnet:new FormControl(''),
    pass:new FormControl('',[Validators.required]),
    confirmPass:new FormControl('',[Validators.required]),
    idCodigo1:new FormControl('',[Validators.required])
  })

  //Propiedaddes al crear un nuevo estudiante
  AlumnoPropiedadesCrear:any={
    creado: this.obtenerFechaActual(),
    activo:'1',
    ver_notas:'1',
    imagen:'assets/img/blank_profile.png',
    idRol:'4',
    idCodigo:'',
    idTutor:'1',
    sexo:'1'
  }

  //Form para iniciar sesion
  loginForm=this.formBuilder.group({
    usuario:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required])
  })

  //Variables que "varian¿?"
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


  constructor(private titleService: Title,private router:Router,private loginService:LoginService,private formBuilder:FormBuilder,private codigoService:CodigosService,private gradosService:GradosService, private alumnoService:AlumnosService, private toastrService:ToastrService) {
    //Aquí irian cosas de activación temprana como identificar rutas en tiempo real y demás, o no sé, yo para eso lo usé una vez
  }

  ngOnInit(): void {
    //Aquí iniciamos los metodos que usamos de primeras si o sí
    this.titleService.setTitle('Login | Bienvenidos');
    this.getGrados();
  }

  //Aqui coloco las funciones que usaremos en nuestro ngOnInit

  //Coloco funcion para que obtenga la fecha con formato
  obtenerFechaActual(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses van de 0 a 11
    const dia = ('0' + fecha.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }

  //Verifica el codigo para crear una cuenta estudiante
  verificarCodigo(codigo:any){
    var dataCodigoAlumno:any={
      idTipoCodigo:'3',
      codigo:codigo
    }
    this.codigoService.isCodigoCorrect(dataCodigoAlumno).subscribe(
      res=>{
        if(res==false){
          this.codigoError='border-danger'
          console.log("No entro xd")
        }else{
          this.isCorrectCodigo=true;
          console.log("Si entro xddd")
          console.log(res[0].idCodigo)
          this.AlumnoPropiedadesCrear.idCodigo=res[0].idCodigo

          //Esta es la funcion de registro metida aquí para que a puro huevo pase la info
          this.loginForm.reset();
          this.subido=true
          this.submitted = true;
          if (this.alumnoForm.invalid) {
            this.passNoCoincide='border-danger'
            this.toastrService.warning(`Datos vacios, ingrese sus datos completos`,'Advertencia')
            return;
          }else if(this.f.pass.value!=this.f.confirmPass.value){
            this.passNoCoincide='border-danger'
            this.toastrService.error(`Contraseñas no coinciden`,'Contraseña')
            return;
          }
          var alumnoInsert:any={}
          alumnoInsert=Object.assign(this.alumnoForm.value,this.AlumnoPropiedadesCrear)
          delete alumnoInsert.confirmPass
          delete alumnoInsert.idCodigo1
          this.alumnoService.insertAlumno(alumnoInsert).subscribe(
            res=>{
              this.alumnoForm.reset();
              this.router.navigate(['admin']);
              this.alertaCreadoCorrecto='1'
              this.toastrService.success(`Datos registrado, ya puede iniciar sesion`,'Registro completado')
            },
            err=>{
              this.alertaCreadoCorrecto='0'
              console.log(alumnoInsert)
              this.toastrService.error(`Codigo invalido`,'Error')
            }
          )
          //Aqui termina la funcion de registro
        }
      },
      err=>{
        console.log(err)
        this.toastrService.error(`Codigo invalido`,'Error')
      }
    )
  }

  //Trae la info de los grados xd
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

  //Se registra
  register(){
    this.verificarCodigo(this.f.idCodigo1.value);
    //Por razones de carga, tuve que pasar la funcion completa a la funcion de verificar codigo, porque se tarda un poco y luego lo
    //Marca vacio por la rapidez de las funciones que van después de la que está primero, que sería la de verificacion
  }

  //Para entrar a la plataforma
  loginIn(){
    this.sppinerOn=true;
    if (this.loginForm.invalid) {
      this.sppinerOn=false;
      this.errorLogininputs='form-control form-control-lg border-danger';
      this.alertaError='1'
      this.toastrService.warning(`Datos vacios, ingrese su correo y contraseña`,'Advertencia')
      return;
    }
    var loginData:any={}
    loginData=Object.assign(this.loginForm.value)
    this.loginService.login(loginData).subscribe((res:any)=>{
        this.toastrService.success(`Inicio de sesion aceptado`,'Bienvenido')
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
        this.toastrService.error(`Correo o contraseña incorrectas`,'Error')
        this.alertaError='1'
      }
    )
  }
  get f() { return this.alumnoForm.controls; }
  get g(){ return this.loginForm.controls;}
}
