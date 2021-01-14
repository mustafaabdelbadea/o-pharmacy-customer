import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }
  baseUrl = "http://localhost:3000/";
  register(registerData:any):Observable<any>
  {
   return this._http.post(this.baseUrl+"customerSignup",registerData);
  }
  login(loginData: any): Observable<any> {
    return this._http.post(this.baseUrl + "customerSignin", loginData);
  }
  resetPassword(registerData: any): Observable<any> {
    return this._http.post(this.baseUrl + "forgotPasswordCustomer", registerData);
  }
  forgotPassword(registerData: any, token: any): Observable<any> {
    return this._http.post(this.baseUrl + "customerForgotPassword/" + token, registerData);
  }
  verifyEmail(token: any): Observable<any> {
    return this._http.get(this.baseUrl + "customerVerifyEmail/" + token);
  }
}
