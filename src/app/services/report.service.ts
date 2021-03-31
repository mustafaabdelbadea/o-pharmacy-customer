import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl = "http://localhost:3000/";
  constructor(private _http: HttpClient) {
  }
  rate(rating:any): Observable<any> {
    return this._http.post(this.baseUrl + "rate", rating,{ headers: new HttpHeaders({'token': 'Bearer' + localStorage.getItem('token')})
  });
  }

  reportProblem(problemData: any): Observable<any> {
    return this._http.post(this.baseUrl + "reportProblem", problemData,{ headers: new HttpHeaders({'token': 'Bearer' + localStorage.getItem('token')})
  });
  }

}
