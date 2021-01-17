import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  //form group check data and validation
  signinForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  });
  //call the api from service 
  signIn() {
    this._AuthService.login(this.signinForm.value).subscribe(data => {
      console.log(data);
      //check if res = success, logged in 
      if (data.message == 'success') {
        localStorage.setItem('token', data.token);
      }
      else {
        //invalid email or password
        console.log(data.message)
      }
    },
      err => {
        console.log(err);
      });
  }
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  ngOnInit(): void {
  }
}
