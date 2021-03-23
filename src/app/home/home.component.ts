import { Component, ElementRef, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isLoggedIn:boolean=false;
  constructor(private elementRef: ElementRef) {
    this.isLogged();
   }
  ngAfterViewInit(){
  


 }
isLogged(){
  if(localStorage.getItem('token')){
    this.isLoggedIn=true;
  }
  else{
    this.isLoggedIn=false;
  }
}
  ngOnInit(): void {
    const options = {
      strings: ['O-Pharmacy'],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true
 };
 
 const typed = new Typed('.typed-element', options);
  }

}
