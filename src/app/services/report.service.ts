import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = "http://localhost:3000/";
  constructor(private _http: HttpClient) {
  }
  reportProblem(problemData: any): Observable<any> {
    return this._http.post(this.baseUrl + "reportProblem", problemData);
  }

}
