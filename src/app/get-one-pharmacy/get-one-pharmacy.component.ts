import { Component, OnInit } from '@angular/core';
import { GetAllPharmaciesService } from '../services/get-all-pharmacies.service';
import{ActivatedRoute}from '@angular/router';
@Component({
  selector: 'app-get-one-pharmacy',
  templateUrl: './get-one-pharmacy.component.html',
  styleUrls: ['./get-one-pharmacy.component.scss']
})
export class GetOnePharmacyComponent implements OnInit {
  onePharmacyData:any;
  pharmacyID:any;
  constructor(_ActivatedRoute:ActivatedRoute,_GetAllPharmaciesService:GetAllPharmaciesService) { 
    this.pharmacyID =  _ActivatedRoute.snapshot.paramMap.get('pharmacyID')
console.log(this.pharmacyID)
    _GetAllPharmaciesService.onePharmacy(this.pharmacyID).subscribe(
      (data)=>{
        this.onePharmacyData=data;
        console.log(data)   
},
(error)=>{
        console.log(error) ;
    })}
    


ngOnInit(): void {
}

}