import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(public _HttpClient:HttpClient) { 
  }

  httpOptions = {
    headers: new HttpHeaders({
   'token':'Bearer' + localStorage.getItem('token')
    }) 
        
    }
  baseUrl = "http://localhost:3000/";


allOrders():Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+"customerOrderHistory",this.httpOptions)
}

oneOrder(orderId:any):Observable<any>
  {
    return this._HttpClient.get(this.baseUrl+"currentOrder/"+orderId,this.httpOptions)
}


}
