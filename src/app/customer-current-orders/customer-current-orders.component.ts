import { Component, OnInit } from '@angular/core';
import{CustomerCurrentOrdersService} from '../services/customer-current-orders.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-customer-current-orders',
  templateUrl: './customer-current-orders.component.html',
  styleUrls: ['./customer-current-orders.component.scss']
})
export class CustomerCurrentOrdersComponent implements OnInit {


  currentOrderData: any;
  pharmacyData:any;
  orderDate:any;
  orderTime:any;
  lng: any;
  latt: any;




  constructor(private _CustomerCurrentOrdersService:CustomerCurrentOrdersService) {
    setTimeout(() => {

  console.log("ay haga");
  _CustomerCurrentOrdersService.currentOrder().subscribe( (data)=>{
        

    if (data.message=='success') {
      this.currentOrderData=data.customerOrders[0];
      this.pharmacyData=data.pharmacyData;
      console.log(data);
    }
    else if (data.message="no order founds") {
      this.currentOrderData=null;   
      this.pharmacyData=null;
      console.log(this.currentOrderData);
      console.log(data);
    }
  
    this.lng=this.pharmacyData.locationAsCoordinates.coordinates.lon;
    this.latt=this.pharmacyData.locationAsCoordinates.coordinates.lat;
    this.orderDate=this.currentOrderData.date.substring(0,10);
    this.orderTime=this.currentOrderData.date.substring(11,19);
  //  this.map();
  },
  err => {
    console.log(err);
  } )
  }, 5000);

   }

   map() {
    console.log(this.lng,this.latt)
    const accessToken = 'pk.eyJ1IjoibXVzdGFmYWFiZGVsYmFkZWEiLCJhIjoiY2tpbHcwNmg2MG0wNjJ2cDlxbXI2NGZxbSJ9.h5Kephiwr11YMCfLXs14FQ';
    var map = new mapboxgl.Map({
      accessToken,
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.latt], // starting position
      zoom: 10,// starting zoom
      trackResize: true
    });
    var marker1 = new mapboxgl.Marker()
        .setLngLat([this.lng,this.latt])
        .addTo(map);

  }   

  ngOnInit(): void {
   
  }

}