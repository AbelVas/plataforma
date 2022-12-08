import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../components/auth-service.service";
import decode from "jwt-decode"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  sppinerOn:boolean=false;
  datosLogin:any={
    usuario:'',
    pass:''
  }
  alertaError='0';
  errorLogininputs='form-control form-control-lg'
  constructor(private router:Router,private loginService:LoginService){}
  ngOnInit(){

  }
  loginIn(){
    this.sppinerOn=true;
    this.loginService.login(this.datosLogin).subscribe((res:any)=>{
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
        this.sppinerOn=false;
        this.errorLogininputs='form-control form-control-lg border-danger';
        this.alertaError='1'
      }
    )
  }
}
