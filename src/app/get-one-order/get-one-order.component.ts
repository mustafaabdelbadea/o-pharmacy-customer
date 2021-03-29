import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import{ActivatedRoute}from '@angular/router';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-get-one-order',
  templateUrl: './get-one-order.component.html',
  styleUrls: ['./get-one-order.component.scss']
})
export class GetOneOrderComponent implements OnInit {

  oneOrderData:any;
  pharmacyData:any;
  orderId:any;
  orderDate:any;
  orderTime:any;
  lng: any;
  latt: any;
  globalStatus:any;
  orderByTexting:any;
  orderByPhoto:any;
  constructor(_ActivatedRoute:ActivatedRoute,_orderHistoryService:OrderHistoryService) { 
    this.orderId =  _ActivatedRoute.snapshot.paramMap.get('currentOrder')

    _orderHistoryService.oneOrder(this.orderId).subscribe(

      (data)=>{
        
    
        if (data.message=='success') {
          this.oneOrderData=data.orderData;
          this.pharmacyData=data.pharmacyData   ;
          this.lng=this.pharmacyData.locationAsCoordinates.coordinates.lon;
          this.latt=this.pharmacyData.locationAsCoordinates.coordinates.lat;
          this.orderDate=this.oneOrderData.date.substring(0,10);
          this.orderTime=this.oneOrderData.date.substring(11,19);
          this.globalStatus=this.oneOrderData.globalStatus;
          this.orderByTexting=this.oneOrderData.orderByTexting;
          this.orderByPhoto=this.oneOrderData.orderByPhoto;
                 console.log(data);
        }
        else if (data.message="no order founds") {
          this.oneOrderData=null;
          this.pharmacyData=null;
          console.log(this.oneOrderData);
          console.log(data);
        }

        //this.map();
      },
(error)=>{
        console.log(error) ;
    })}

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
