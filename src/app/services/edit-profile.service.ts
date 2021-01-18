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
  }}
