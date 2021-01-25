import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl} from '@angular/forms';

import {CustomerHistoryService} from '../services/customer-history.service'

import {Validators} from '@angular/forms'


@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.scss']
})
export class CustomerHistoryComponent implements OnInit {


   medicalHistoryForm = new FormGroup({

    'doYouHaveDiabates' : new FormControl (false,),

    'highBloodPreasure' : new FormControl(false,),

    'highCholestrol' : new FormControl(false,),

    'doYousmoke' : new FormControl(false,),

    'doYouVape' : new FormControl(false,),

    'doYouDrinkAlcohol' : new FormControl(false,),

    'doYouUseDrugs' : new FormControl(false,),

    'doYouExersize' : new FormControl(false,),

    'whatsYourMAritalStatus' : new FormControl(null,Validators.required),

    'bloodType' : new FormControl(null,Validators.required),

    'doYouHaveOtherHealthConditions' : new FormControl(null,Validators.required),
    
    'patientConcerns' : new FormControl(null,Validators.required)

  })

  constructor(private _CustomerHistoryService:CustomerHistoryService) { }

  enterhistory()
  {
   let doYouHaveDiabates= this.medicalHistoryForm.value.doYouHaveDiabates;
   let highBloodPreasure=this.medicalHistoryForm.value.highBloodPreasure;
   let highCholesterol=this.medicalHistoryForm.value.highCholestrol;
   let doYouSmoke=this.medicalHistoryForm.value.doYousmoke;
   let doYouVape=this.medicalHistoryForm.value.doYouVape;
   let doYouDrinkAlcohol=this.medicalHistoryForm.value.doYouDrinkAlcohol;
   let doYouUseDrugs=this.medicalHistoryForm.value.doYouUseDrugs;
   let doYouExercize=this.medicalHistoryForm.value.doYouExersize;
   let whatIsYourMaritalStatus=this.medicalHistoryForm.value.whatsYourMAritalStatus;
   let bloodType=this.medicalHistoryForm.value.bloodType;
   let doYouHaveOtherHealthCondition=this.medicalHistoryForm.value.doYouHaveOtherHealthConditions;
   let atientConcerns=this.medicalHistoryForm.value.patientConcerns;


    this._CustomerHistoryService.enterhistory(doYouHaveDiabates, highBloodPreasure, highCholesterol,
      doYouSmoke, doYouVape, doYouDrinkAlcohol,
      doYouUseDrugs, doYouExercize, whatIsYourMaritalStatus,
      bloodType, doYouHaveOtherHealthCondition, atientConcerns).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }


  ngOnInit(): void {
  }
  test()
  {
    alert("Your medical form has been submited")
    console.log(this.medicalHistoryForm);
  }
}
