import { Component, OnInit } from '@angular/core';
import{CustomerCurrentOrdersService} from '../services/customer-current-orders.service';
@Component({
  selector: 'app-customer-current-orders',
  templateUrl: './customer-current-orders.component.html',
  styleUrls: ['./customer-current-orders.component.scss']
})
export class CustomerCurrentOrdersComponent implements OnInit {


  currentOrderData: any;

  constructor(private _CustomerCurrentOrdersService:CustomerCurrentOrdersService) {

_CustomerCurrentOrdersService.currentOrder().subscribe( (data)=>{
        
  this.currentOrderData = data; 


},
err => {
  console.log(err);
} )

   }

  ngOnInit(): void {
  }

}