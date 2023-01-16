import { Component, OnInit } from '@angular/core';
import { PerfilAlumnoService } from '../../services/perfil-alumno.service';
import decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-perfil-alumno',
  templateUrl: './password-perfil-alumno.component.html',
  styleUrls: ['./password-perfil-alumno.component.css']
})
export class PasswordPerfilAlumnoComponent implements OnInit {

  constraCorrecta:boolean=false;
  passOriginal:any={pass:''};
  idAlumno:any;
  errorLogininputs='form-control'
  alertaError='0';
  alertaErrorCambioContra='0'
  alertaErrorDos='0';
  alertaSuccess='0';
  alertaVacio='0';
  contraNueva:string='';
  contraNuevaRe:string='';
  passNew:any={
    pass:''
  }

  constructor(private perfilAlumnosService:PerfilAlumnoService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idAlumno=idUsuario;
  }

  verificarPass(password:string){
    this.passOriginal.pass=password;
    this.perfilAlumnosService.passwordCompare(this.idAlumno,this.passOriginal).subscribe(
      res=>{
        this.constraCorrecta=true;
        this.errorLogininputs='form-control';
        this.alertaError='0'
      },
      err=>{
        this.errorLogininputs='form-control border-danger';
        this.alertaError='1'
      }
    )
  }

  compararImputsContras(){
    if(this.passOriginal.pass==this.contraNueva){
      this.alertaError='0'
      this.alertaErrorDos='1'
    }else{
      if(this.contraNueva==''||this.contraNuevaRe==''){
        this.alertaVacio='1'
      }else{
        if(this.contraNueva===this.contraNuevaRe){
          this.passNew.pass=this.contraNuevaRe;
          this.perfilAlumnosService.updateAlumno(this.passNew,this.idAlumno).subscribe(
            res=>{
              this.alertaError='0';
              this.alertaErrorCambioContra='0'
              this.alertaErrorDos='0';
              this.alertaSuccess='1'
              this.constraCorrecta=false;
              this.passOriginal.pass='';
              this.toastrService.success(`Contraseña Actualizada`,'Realizado')
            },
            err=>{
              this.alertaErrorCambioContra='1'
              this.toastrService.error(`Contraseña no Actualizada`,'Error')
            }
          );
          this.errorLogininputs='form-control';
          this.alertaError='0'
        }else{
          this.errorLogininputs='form-control border-danger';
          this.alertaErrorDos='0'
          this.alertaError='1'
        }
      }
    }
  }


}
