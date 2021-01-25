import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders}from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerHistoryService {

 

  constructor(public _HttpClient:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
   'token':'Bearer' + localStorage.getItem('token')
    }) 
        
    }



  baseUrl = "http://localhost:3000/";

  

  enterhistory(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "medicalhistory",data,this.httpOptions);
  }


  gethistory():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl + "medicalhistoryRetrieve",this.httpOptions);
  }


}
