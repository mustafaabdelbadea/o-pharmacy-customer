import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import{ActivatedRoute}from '@angular/router';
@Component({
  selector: 'app-get-one-order',
  templateUrl: './get-one-order.component.html',
  styleUrls: ['./get-one-order.component.scss']
})
export class GetOneOrderComponent implements OnInit {

  oneOrderData:any;
  orderId:any;
  constructor(_ActivatedRoute:ActivatedRoute,_orderHistoryService:OrderHistoryService) { 
    this.orderId =  _ActivatedRoute.snapshot.paramMap.get('currentOrder')

    _orderHistoryService.oneOrder(this.orderId).subscribe(

      (data)=>{
        
        this.oneOrderData=data;    
},
(error)=>{
        console.log(error) ;
    })}
    


ngOnInit(): void {
}

}
