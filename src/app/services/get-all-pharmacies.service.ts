import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetAllPharmaciesService {

  constructor(public _HttpClient:HttpClient) { }


  baseUrl = "http://localhost:3000/";


allPharmacies():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+"ourPharmacies")
}
}
