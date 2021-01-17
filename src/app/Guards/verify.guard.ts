import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  //get token from local storage
  token: any = localStorage.getItem('token');
  //decode token
  decoded: any = jwt_decode(this.token);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //check if email verified or not from token 
      if (this.decoded.isVerified==true) {
        return true;
      } else {
        this._Router.navigate(["/ss"]);
        return false;
      }
 
  }
  
}
