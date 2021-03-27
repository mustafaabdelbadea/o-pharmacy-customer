import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isClicked:any=false;
isMatched:any;
isEnteredCoordinates:any;
returnMessage:any;
  //get data from form 
  signupForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)]),
    'phone': new FormControl(null, [Validators.required, Validators.pattern(/^(201)[0-9]{9}/)]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'locationAsAddress': new FormControl(null, [Validators.required]),
    'flat': new FormControl(null, [Validators.required]),
    'floor': new FormControl(null, [Validators.required]),
    'building': new FormControl(null, [Validators.required]),
    'gender': new FormControl(null, Validators.required),
    'birthdate': new FormControl(null, Validators.required),
  });


  //signup button 
  signUp() {
    this.isClicked=true;
    if (this.signupForm.value.password != this.signupForm.value.confirmPassword) {
      this.isMatched=true;
      this.isClicked=false;
    }
    else {
      console.log('matched')
      this.isMatched=false;
    //data is the json that will send to backend
    let data = {
      name: this.signupForm.value.name,
      phone: this.signupForm.value.phone,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
      gender: this.signupForm.value.gender,
      birthDate: this.signupForm.value.birthdate,
      //concat address 
      locationAsAddress: this.signupForm.value.locationAsAddress + ' building:' + this.signupForm.value.building + ' floor:' + this.signupForm.value.floor + ' flat:' + this.signupForm.value.flat,
      locationAsCoordinates: {
        coordinates: {
          lat: this.latt, lon: this.lng
        }
      }
    }

    //check if user used map to enter location or not the function return true or false 
    if (this.checklocation(this.latt, this.lng) != false) {
      // if used map add the user 
      this._AuthService.register(data).subscribe(d => {
        this.isClicked=false;

        if (d.message == 'Success') {
          this.isEnteredCoordinates=null;
          this.returnMessage=d.message;
          this.signupForm.reset();
        }
        console.log(d)
        if (d.errors) {

          d.message = 'Enter Valid Data';
          this.returnMessage=d.message;


        }
        this.returnMessage=d.message;
        console.log(d.message)

      },
        err => {
          console.log(err);
          this.returnMessage='check the entered data';
          console.log('check the entered data')
        })
    } else {
      this.isClicked=false;
     this.isEnteredCoordinates='Enter Coordinates';
    }
  }}
  //check if user used map to enter location or not the function return true or false 
  checklocation(ln: any, la: any): any {
    if (ln == undefined || ln == null)
      return false
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
      console.log(position)
      return position;

    });
  }
  ngOnInit(): void {
    //calll the map
    this.map()
  }

}
