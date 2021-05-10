import { Component, OnInit } from '@angular/core';
import {CustomerHistoryService} from '../services/customer-history.service'

@Component({
  selector: 'app-get-medical-history',
  templateUrl: './get-medical-history.component.html',
  styleUrls: ['./get-medical-history.component.scss']
})
export class GetMedicalHistoryComponent implements OnInit {
  
   history:any;
   bloodType:any;
   maritalStatus:any;
   Cholesterol:any;
   highBloodPreasure:any;
   diabetes:any;
   doYouSmoke:any;
   doYouVape:any; 
   doYouDrinkAlcohol:any;
   doYouUseDrugs:any;
   doYouExercize:any;
   patientConcerns:any;
   doYouHaveOtherHealthConditions:any;

  constructor(private _CustomerHistoryService:CustomerHistoryService) { 

    _CustomerHistoryService.gethistory().subscribe( (data)=>{
        
      if (data.length==0)
      this.history=null;
      else
      {this.history=data;
       this.bloodType=data[0].bloodType;
       this.maritalStatus=data[0].whatIsYourMaritalStatus;
       this.doYouHaveOtherHealthConditions=data[0].doYouHaveOtherHealthConditions;
       this.patientConcerns=data[0].patientConcerns;


       if(data[0].highCholesterol)
       this.Cholesterol="Yes"
       else
       this.Cholesterol="No"
       
       if(data[0].highBloodPreasure)
       this.highBloodPreasure="Yes"
       else
       this.highBloodPreasure="No"
       
       if(data[0].doYouHaveDiabates)
       this.diabetes="Yes"
       else
       this.diabetes="No"

       if(data[0].doYouSmoke)
       this.doYouSmoke="Yes"
       else
       this.doYouSmoke="No"
       
       if(data[0].doYouVape)
       this.doYouVape="Yes"
       else
       this.doYouVape="No"
       
       if(data[0].doYouDrinkAlcohol)
       this.doYouDrinkAlcohol="Yes"
       else
       this.doYouDrinkAlcohol="No"

       if(data[0].doYouUseDrugs)
       this.doYouUseDrugs="Yes"
       else
       this.doYouUseDrugs="No"
       
       if(data[0].doYouExercize)
       this.doYouExercize="Yes"
       else
       this.doYouExercize="No"
       


      } 
    
    },
    err => {
      console.log(err);
    } )    
   }

  ngOnInit(): void {
  }

}
