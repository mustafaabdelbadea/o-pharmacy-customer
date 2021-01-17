import { Injectable } from '@angular/core';

import{HttpClient, HttpHeaders}from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetHealthNewsService {

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'token':'5fb6890f4331ab10881bf2fc'
  //   }) 
      
  // }

  constructor(public _HttpClient:HttpClient) { }

  getnews():Observable<any>
{
  return this._HttpClient.get("http://newsapi.org/v2/top-headlines?country=eg&category=health&apiKey=995310e0ca154ddb8c28bb4be0c6df68")
  //return this._HttpClient.get("http://localhost:3000/ourPharmacies",this.httpOptions)
}

}
