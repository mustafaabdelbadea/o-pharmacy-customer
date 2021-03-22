import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetAllMedicineService {

  constructor(public _HttpClient:HttpClient) { }
  baseUrl = "http://localhost:3000/";
  allMedicine():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+"getAllMedicine",)
}
}
