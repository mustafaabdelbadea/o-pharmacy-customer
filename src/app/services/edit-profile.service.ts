import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders}from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(public _HttpClient:HttpClient) { }
  
  
 httpOptions = {
  headers: new HttpHeaders({
 'token':'Bearer' + localStorage.getItem('token')
  }) 
      
  }

  baseUrl = "http://localhost:3000/";
  

  editName(name:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerName",{name},this.httpOptions);
  }

  editPassword(oldpassword :any, password:any ,confirmPassword:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerPass",{oldpassword, password ,confirmPassword},this.httpOptions);
  }

  editPhones(phones :any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerPhone",{phones},this.httpOptions);
  }

  editAddress(address :any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerAddress",{address},this.httpOptions);
  }

  editCoordinates(lat :any,lon:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerCoordinates",{ lat , lon},this.httpOptions);
  }

  editCustomerPhoto(photo:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "editCustomerPhoto",{photo},this.httpOptions);

  }
}
