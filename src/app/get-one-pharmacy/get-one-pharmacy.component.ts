import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import{ActivatedRoute}from '@angular/router';
@Component({
  selector: 'app-get-one-pharmacy',
  templateUrl: './get-one-pharmacy.component.html',
  styleUrls: ['./get-one-pharmacy.component.scss']
})
export class GetOnePharmacyComponent implements OnInit {
  onePharmacyData:any;
  orderId:any;
  constructor(_ActivatedRoute:ActivatedRoute,_orderHistoryService:OrderHistoryService) { 
    this.orderId =  _ActivatedRoute.snapshot.paramMap.get('pharmacyID')

    _orderHistoryService.onePharmacy(this.orderId).subscribe(

      (data)=>{
        
        this.onePharmacyData=data;    
},
(error)=>{
        console.log(error) ;
    })}
    


ngOnInit(): void {
}

}