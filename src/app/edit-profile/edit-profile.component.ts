import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {EditProfileService} from '../services/edit-profile.service'
import * as mapboxgl from 'mapbox-gl';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  token:any=localStorage.getItem('token');
  name:any;
  email:any;
   decoded:any;
   photo:any;
   phone:any;
address:any;
coordinatesLon:any;
coordinatesLat:any;
nameMessage:any;
phoneMessage:any;
addressMessage:any;
locationMessage:any;
passwordMessage:any;
photoMessage:any;
  editNameForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)])
    });
 
  editName()
  {
    let name = this.editNameForm.value.name;
    console.log(name);
    
    this._EditProfileService.editName(name).subscribe(d => {
      this.nameMessage=d.message;
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
      this.passwordMessage=d.message;
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }


  editPhonesForm = new FormGroup({
    'phones': new FormControl(null, [Validators.required, Validators.pattern(/^(201)[0-9]{9}/),Validators.maxLength(12)])
      });
 
    editPhones()
  {
    let phones =[];
    phones.push(this.editPhonesForm.value.phones); 
    console.log(this.editPhonesForm.value.phones);
    console.log(phones);
    
    this._EditProfileService.editPhones(phones).subscribe(d => {
      this.phoneMessage=d.message;
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
      this.addressMessage=d.message;

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
      center: [ this.coordinatesLon,this.coordinatesLat], // starting position
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
    var marker1 = new mapboxgl.Marker()
    .setLngLat([this.coordinatesLon,this.coordinatesLat])
    .addTo(map);

    map.addControl(geolocate);
    geolocate.on('geolocate', (e: any) => {
      marker1.remove();
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
      this.locationMessage=d.message;

      console.log(d)
    },
      err => {
        console.log(err);
      })
 }
  
  constructor(private _EditProfileService :EditProfileService) { 
   this.isLogged();
  }

isLogged(){
    if(this.token){
      this.decoded = jwt_decode(this.token);
      this.name=this.decoded.name;
      this.email=this.decoded.email;
      this.phone=this.decoded.phone;
      this.address=this.decoded.locationAsAddress;
      this.coordinatesLat=this.decoded.locationAsCoordinates.coordinates.lat
      this.coordinatesLon=this.decoded.locationAsCoordinates.coordinates.lon

      if (localStorage.getItem('photo')!=null||localStorage.getItem('photo')!=undefined) {
        this.photo=localStorage.getItem('photo');
      }
    }
  }

  fileTypes: any = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  validFileType(file: any) {
    for (var i = 0; i < this.fileTypes.length; i++) {
      if (file.type === this.fileTypes[i]) {
        return true;
      }
    }

    return false;
  }
  url: any;
  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0].type)
      if (this.validFileType(event.target.files[0])) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          this.photo=this.url;
          console.log(this.url)
        }
      }
      else {
        console.log('upload image !!');
        //if not image make url = not found 
      //  this.url = this.baseUrl;
      }
    }
  }
  editPhoto()
  {
    if(this.url!=null){

    };
    
    this._EditProfileService.editCustomerPhoto(this.url).subscribe(d => {
      this.photoMessage=d.message;
      console.log(d)
    },
      err => {
        console.log(err);
      })

  
  }
  cancelCahnge(){
    if (localStorage.getItem('photo')!=null||localStorage.getItem('photo')!=undefined) {
      this.photo=localStorage.getItem('photo');
    }

    else{
      this.photo=null
    }
  }
  ngOnInit(): void {
    this.map()
  }

}
