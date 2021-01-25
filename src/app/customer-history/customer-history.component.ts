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
    let data={
       doYouHaveDiabates: this.medicalHistoryForm.value.doYouHaveDiabates,
       highBloodPreasure:this.medicalHistoryForm.value.highBloodPreasure,
       highCholesterol:this.medicalHistoryForm.value.highCholestrol,
       doYouSmoke:this.medicalHistoryForm.value.doYousmoke,
       doYouVape:this.medicalHistoryForm.value.doYouVape,
       doYouDrinkAlcohol:this.medicalHistoryForm.value.doYouDrinkAlcohol,
       doYouUseDrugs:this.medicalHistoryForm.value.doYouUseDrugs,
       doYouExercize:this.medicalHistoryForm.value.doYouExersize,
       whatIsYourMaritalStatus:this.medicalHistoryForm.value.whatsYourMAritalStatus,
       bloodType:this.medicalHistoryForm.value.bloodType,
       doYouHaveOtherHealthConditions:this.medicalHistoryForm.value.doYouHaveOtherHealthConditions,
       patientConcerns:this.medicalHistoryForm.value.patientConcerns,
    }



    this._CustomerHistoryService.enterhistory(data).subscribe(d => {
      console.log(data)
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
