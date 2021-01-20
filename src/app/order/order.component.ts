import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  url: any;
  onSelectFile(event:any) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          console.log(this.url)
        }
      }
  }
    //form group check data and validation
    orderForm = new FormGroup({
      'orderByTexting': new FormControl(null, [Validators.required]),
    });
    //call the api from service 
    order() {
  let data={
    orderByTexting:this.orderForm.value.orderByTexting,
    orderByPhoto:this.url
  }
  if(data.orderByTexting==null &&data.orderByPhoto==null){
    window.alert('add order');
  }
  else{
    this._OrderService.order(data).subscribe(orderData => {
      //check if res = success, logged in 
      if (orderData.message == 'order saved') {
       console.log('order saved')
      }
      else {
        //invalid email or password
        console.log(orderData.message)
      }
    },
      err => {
        console.log(err);
      });
  }
     
    }
  constructor(private _OrderService: OrderService, private _Router: Router) { }



  ngOnInit(): void {
  }

}
