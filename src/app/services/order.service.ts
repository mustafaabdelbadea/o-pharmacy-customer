import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = "http://localhost:3000/";
  constructor(private _http: HttpClient) {
  }

  order(orderData: any): Observable<any> {
    return this._http.post(this.baseUrl + "getNearestPharmacy", orderData,{ headers: new HttpHeaders({'token': 'Bearer' + localStorage.getItem('token')})
  });
  }
}
