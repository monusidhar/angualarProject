import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from 
'@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _tocken: any;

  constructor(
    private router: Router,
    private authService: AuthService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // this.authService.loginTocken.subscribe(
    //     tockenRecived => this._tocken= tockenRecived
    // )
    // localStorage.setItem('userToken', this._tocken)
    
    // if(this._tocken){
    //   return true;
    // }else{
    //   this.router.navigate(["login"]);
    //   return false;
    // }

    let loggedInUser= JSON.parse(localStorage.getItem('userData'));
    if(!loggedInUser){
      this.router.navigate(["login"]);
     return false;
    }else{
      return true;
    }

  }
}