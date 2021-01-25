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

  

  enterhistory(doYouHaveDiabates:any, highBloodPreasure:any, highCholesterol:any,
    doYouSmoke:any, doYouVape:any, doYouDrinkAlcohol:any,
    doYouUseDrugs:any, doYouExercize:any, whatIsYourMaritalStatus:any,
    bloodType:any, doYouHaveOtherHealthCondition:any, atientConcerns:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "medicalhistory",{doYouHaveDiabates, highBloodPreasure, highCholesterol,
                                                                     doYouSmoke, doYouVape, doYouDrinkAlcohol,
                                                                      doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
                                                                      bloodType, doYouHaveOtherHealthCondition, atientConcerns},this.httpOptions);
  }


  gethistory():Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "medicalhistoryRetrieve",this.httpOptions);
  }


}
