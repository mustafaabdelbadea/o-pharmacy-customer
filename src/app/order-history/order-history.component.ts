import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  allOrdersData:any

  constructor(_orderHistoryService:OrderHistoryService) { 

    _orderHistoryService.allOrders().subscribe(

      (data)=>{
        console.log('tests')
        if (data.message=='success') {
          this.allOrdersData=data.customerOrders;
        }
        else if (data.message="You Didn't Order Yet") {
          this.allOrdersData=null;   
          console.log(this.allOrdersData);
        }
          

        
        // console.log(data) 
},
(error)=>{
        console.log(error) ;
    })}
    


ngOnInit(): void {
}

}
