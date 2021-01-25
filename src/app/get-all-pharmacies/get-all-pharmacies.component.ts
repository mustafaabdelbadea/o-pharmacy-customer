import { Component, OnInit } from '@angular/core';


import {GetAllPharmaciesService} from  '../services/get-all-pharmacies.service';

@Component({
  selector: 'app-get-all-pharmacies',
  templateUrl: './get-all-pharmacies.component.html',
  styleUrls: ['./get-all-pharmacies.component.scss']
})
export class GetAllPharmaciesComponent implements OnInit {

  allPharmaciesData :any;

  constructor(_GetAllPharmaciesService:GetAllPharmaciesService) {

    _GetAllPharmaciesService.allPharmacies().subscribe( (data)=>{
        
      this.allPharmaciesData = data; 
      console.log(data)
  
    
    },
    err => {
      console.log(err);
    } )




   }

  ngOnInit(): void {
  }

}
