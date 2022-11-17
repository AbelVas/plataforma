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
    this.loginService.login(this.datosLogin).subscribe((res:any)=>{
        localStorage.setItem('Acces-Token',res.token);
        const {idRol}:any=decode(res.token);
        if(idRol==1){
          this.router.navigate(['admin']);
        }else if(idRol==2){
          this.router.navigate(['teacher']);
        }else if(idRol==3){
          this.router.navigate(['student']);
        }
      },
      error=>{
        this.errorLogininputs='form-control form-control-lg border-danger';
        this.alertaError='1'
      }
    )
  }
}
