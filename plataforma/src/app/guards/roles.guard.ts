import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../public/login/components/auth-service.service';
import decode from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private authService:LoginService, private router:Router){}

  canActivate(route:ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data['expectedRole'];
    const token:any = localStorage.getItem('Acces-Token');
    const {idRol}:any=decode(token);
    if(this.authService.isAuth()==false || idRol != expectedRole){
      localStorage.removeItem('Acces-Token');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
/*
  canActivateChild(route:ActivatedRouteSnapshot):boolean {
   const expectedRole= route.data['expectedRole'];
   const Token:any=localStorage.getItem('Acces-Token');
   const idRol:any=decode(Token.idRol);
   console.log(expectedRole);
   if(!this.authService.isAuth()||idRol!==expectedRole){
    console.log('Usuario no autorizado para la vista');
    this.router.navigate(['login']);
    return false;
   }
    return true;
  }
*/
}
