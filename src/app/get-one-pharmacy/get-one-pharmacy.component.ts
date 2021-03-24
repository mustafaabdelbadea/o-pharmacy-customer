import { Component, OnInit } from '@angular/core';
import { GetAllPharmaciesService } from '../services/get-all-pharmacies.service';
import{ActivatedRoute}from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-get-one-pharmacy',
  templateUrl: './get-one-pharmacy.component.html',
  styleUrls: ['./get-one-pharmacy.component.scss']
})
export class GetOnePharmacyComponent implements OnInit {
  onePharmacyData:any;
  pharmacyID:any;
  lng: any;
  latt: any;
  pharmacyName:any;
  pharmacyLogo:any;
  pharmacyAddress:any;
  pharmacyRate:any;
  pharmacyPhones:any;
  constructor(_ActivatedRoute:ActivatedRoute,_GetAllPharmaciesService:GetAllPharmaciesService) { 
    this.pharmacyID =  _ActivatedRoute.snapshot.paramMap.get('pharmacyID')
console.log(this.pharmacyID)
    _GetAllPharmaciesService.onePharmacy(this.pharmacyID).subscribe(
      (data)=>{
        this.onePharmacyData=data;
        this.pharmacyName=data.name;
        this.pharmacyLogo=data.logo;
        this.pharmacyAddress=data.locationAsAddress;
        if (data.rate==null||data.rate==undefined) {
          this.pharmacyRate=null;

        }
        else
        {
          this.pharmacyRate=data.rate;

        }
        this.pharmacyPhones=data.phones[0];
        this.lng=this.onePharmacyData.locationAsCoordinates.coordinates.lon;
        this.latt=this.onePharmacyData.locationAsCoordinates.coordinates.lat;
        this.map();
        console.log(data)   
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