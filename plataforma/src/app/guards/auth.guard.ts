import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../public/login/components/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild{

  constructor(private authService:LoginService, private router:Router){}
  canActivate():boolean {
    if(!this.authService.isAuth()){
      console.log('Token no Valido o ya expiró');
      localStorage.removeItem('Acces-Token');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild():boolean {
    if(!this.authService.isAuth()){
      console.log('Token no Valido o ya expiró');
      localStorage.removeItem('Acces-Token');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
