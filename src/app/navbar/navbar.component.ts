import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean=false;

  constructor() {
    this.isLogged();

   }

  ngOnInit(): void {
  }

  isLogged(){
    if(localStorage.getItem('token')){
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }
}
