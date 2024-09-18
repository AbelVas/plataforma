import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../components/auth-service.service";
import decode from "jwt-decode";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CodigosService } from "src/app/admin/services/codigos.service";
import { GradosService } from "src/app/admin/services/grados-admin.service";
import { AlumnosService } from "src/app/admin/services/alumnos.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinnerOn: boolean = false;
  listaGrados: any[] = [];
  submitted = false;
  passNoCoincide: string = '';
  guardado: boolean = false;
  codigoError: string = '';
  registrarse: boolean = false;
  alertaError: string = '0';
  alertaCreadoCorrecto: string = '3';
  subido: boolean = false;
  errorLogininputs: string = 'form-control form-control-lg';
  isCorrectCodigo: boolean = false;

  AlumnoPropiedadesCrear = {
    creado: '2023-01-30',
    activo: '1',
    ver_notas: '1',
    imagen: 'assets/img/blank_profile.png',
    idRol: '4',
    idCodigo: '',
    idTutor: '1',
    sexo: '1'
  };

  alumnoForm = this.formBuilder.group({
    idGrado: new FormControl('', [Validators.required]),
    nombres_alumno: new FormControl('', [Validators.required]),
    apellidos_alumno: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    carnet: new FormControl(''),
    pass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required])
  });

  loginForm = this.formBuilder.group({
    usuario: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private codigoService: CodigosService,
    private gradosService: GradosService,
    private alumnoService: AlumnosService
  ) {}

  ngOnInit(): void {}

  verificarCodigo(codigo: string): void {
    const dataCodigoAlumno = { idTipoCodigo: '3', codigo };
    this.codigoService.isCodigoCorrect(dataCodigoAlumno).subscribe(
      res => {
        if (!res) {
          this.codigoError = 'border-danger';
        } else {
          this.isCorrectCodigo = true;
          this.AlumnoPropiedadesCrear.idCodigo = res[0].idCodigo;
          this.getGrados();
        }
      },
      err => console.error(err)
    );
  }

  getGrados(): void {
    this.gradosService.getGrados().subscribe(
      res => (this.listaGrados = res),
      err => console.error(err)
    );
  }

  inicioRegistro(): void {
    this.registrarse = true;
  }

  salirRegistro(): void {
    this.registrarse = false;
    this.isCorrectCodigo = false;
  }

  register(): void {
    this.subido = true;
    this.submitted = true;
    if (this.alumnoForm.invalid || this.f.pass.value !== this.f.confirmPass.value) {
      this.passNoCoincide = 'border-danger';
      return;
    }

    const alumnoInsert = { ...this.alumnoForm.value, ...this.AlumnoPropiedadesCrear };
    delete alumnoInsert.confirmPass;

    this.alumnoService.insertAlumno(alumnoInsert).subscribe(
      () => {
        this.alumnoForm.reset();
        this.router.navigate(['admin']);
        this.alertaCreadoCorrecto = '1';
        this.salirRegistro();
      },
      () => (this.alertaCreadoCorrecto = '0')
    );
  }

  loginIn(): void {
    this.spinnerOn = true;
    if (this.loginForm.invalid) {
      this.spinnerOn = false;
      this.errorLogininputs = 'form-control form-control-lg border-danger';
      this.alertaError = '1';
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('Acces-Token', res.token);
        const { idRol }: any = decode(res.token);
        this.spinnerOn = false;
        switch (idRol) {
          case 1:
            this.router.navigate(['admin']);
            break;
          case 2:
            this.router.navigate(['teacher']);
            break;
          case 3:
            this.router.navigate(['tutor']);
            break;
          case 4:
            this.router.navigate(['student']);
            break;
        }
      },
      () => {
        this.spinnerOn = false;
        this.errorLogininputs = 'form-control form-control-lg border-danger';
        this.alertaError = '1';
      }
    );
  }

  get f() {
    return this.alumnoForm.controls;
  }

  get g() {
    return this.loginForm.controls;
  }
}
