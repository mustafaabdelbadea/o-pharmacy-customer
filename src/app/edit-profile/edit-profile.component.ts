import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {EditProfileService} from '../services/edit-profile.service'
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editNameForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)])
    });
 
  editName()
  {
    let name = this.editNameForm.value.name;
    console.log(name);
    
    this._EditProfileService.editName(name).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }


  editPassForm = new FormGroup({
    'oldPassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
    });
  passwordNotMatch(){  
   if (this.editPassForm.value.password==this.editPassForm.value.confirmPassword) {
     return false;
   } else {
     return true;
   }     
   }
  
  editPass()
  {
        let oldpassword = this.editPassForm.value.oldPassword;
        let password = this.editPassForm.value.password;
        let confirmpassword = this.editPassForm.value.confirmPassword;
                
    this._EditProfileService.editPassword(oldpassword,password,confirmpassword).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }


  editPhonesForm = new FormGroup({
    'phones': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)])
      });
 
    editPhones()
  {
    let phones =[];
    phones.push(this.editPhonesForm.value.phones); 
    console.log(this.editPhonesForm.value.phones);
    console.log(phones);
    
    this._EditProfileService.editPhones(phones).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }
  

  editAddressForm = new FormGroup({
    'locationAsAddress': new FormControl(null, [Validators.required]),
    'building': new FormControl(null, [Validators.required]),
    'flat': new FormControl(null, [Validators.required]),
    'floor': new FormControl(null, [Validators.required])
 });
 
    editAddress()
  {
    let address = this.editAddressForm.value.locationAsAddress + ' building:' + this.editAddressForm.value.building + ' floor:' + this.editAddressForm.value.floor + ' flat:' + this.editAddressForm.value.flat;
    
    this._EditProfileService.editAddress(address).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }

  lng: any;
  latt: any;
  //mapbox
  map() {
    const accessToken = 'pk.eyJ1IjoibXVzdGFmYWFiZGVsYmFkZWEiLCJhIjoiY2tpbHcwNmg2MG0wNjJ2cDlxbXI2NGZxbSJ9.h5Kephiwr11YMCfLXs14FQ';
    var map = new mapboxgl.Map({
      accessToken,
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.013056, 31.208853], // starting position
      zoom: 9,// starting zoom
      trackResize: true
    });
    //to get coord when click on button
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: false
      },
      trackUserLocation: true
 
    });
    map.addControl(geolocate);
    geolocate.on('geolocate', (e: any) => {
      this.lng = e.coords.longitude;
      this.latt = e.coords.latitude
      var position = [this.lng, this.latt];
      console.log(this.lng ,this.latt)
      return position;
 
    });
  }
 
  checkNolocation(): any {
   if (this.latt == undefined|| this.latt == null|| this.lng == undefined || this.lng == null)
     return true
 }
 
  editCoordinates()
  { 
    let lat= this.latt;
   let lon = this.lng;
     
    this._EditProfileService.editCoordinates(lat,lon).subscribe(d => {
      console.log(d)
    },
      err => {
        console.log(err);
      })
 }
  
  constructor(private _EditProfileService :EditProfileService) { }


  ngOnInit(): void {
    this.map()
  }

}
