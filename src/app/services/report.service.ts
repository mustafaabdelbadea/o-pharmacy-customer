import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  httpOptions = {
    headers: new HttpHeaders({
   'token':'Bearer' + localStorage.getItem('token')

    }) 
        
    }

  baseUrl = "http://localhost:3000/";
  constructor(private _http: HttpClient) {
  }
  rate(rate:any,report:any,orderId:any): Observable<any> {
    return this._http.post(this.baseUrl + "rate", {rate,report,orderId},this.httpOptions);
  }

  reportProblem(problemData: any): Observable<any> {
    return this._http.post(this.baseUrl + "reportProblem", problemData,{ headers: new HttpHeaders({'token': 'Bearer' + localStorage.getItem('token')})
  });
  }

}
