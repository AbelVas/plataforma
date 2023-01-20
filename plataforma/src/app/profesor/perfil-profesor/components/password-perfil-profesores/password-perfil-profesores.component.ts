import { Component, OnInit } from '@angular/core';
import { PerfilProfesorService } from '../../../services/perfil-profesor.service';
import decode from "jwt-decode"

@Component({
  selector: 'app-password-perfil-profesores',
  templateUrl: './password-perfil-profesores.component.html',
  styleUrls: ['./password-perfil-profesores.component.css']
})
export class PasswordPerfilProfesoresComponent implements OnInit {

  constraCorrecta:boolean=false;
  passOriginal:any={pass:''};
  idProfesor:any;
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

  constructor(private perfilProfesorService:PerfilProfesorService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('Acces-Token');
    const {idUsuario}:any=decode(token);
    this.idProfesor=idUsuario;
  }
  verificarPass(password:string){
    this.passOriginal.pass=password;
    this.perfilProfesorService.passwordCompare(this.idProfesor,this.passOriginal).subscribe(
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
          this.perfilProfesorService.updateProfesor(this.passNew,this.idProfesor).subscribe(
            res=>{
              this.alertaError='0';
              this.alertaErrorCambioContra='0'
              this.alertaErrorDos='0';
              this.alertaSuccess='1'
              this.constraCorrecta=false;
              this.passOriginal.pass='';
            },
            err=>{
              this.alertaErrorCambioContra='1'
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
