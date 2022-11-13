import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../components/auth-service.service";

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

  errorLogininputs='form-control form-control-lg'
  constructor(private router:Router,private loginService:LoginService){}
  ngOnInit(){

  }
  loginIn(){
    this.loginService.login(this.datosLogin).subscribe((res:any)=>{
        localStorage.setItem('Acces-Token',res.token);
        this.router.navigate(['admin']);
      },
      error=>{
        console.log(error);
      }
    )
   // this.errorLogininputs='form-control form-control-lg border-danger';
  }
}
