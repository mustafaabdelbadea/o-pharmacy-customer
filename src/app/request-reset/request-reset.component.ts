import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  //take email from form
  isClicked:any=false;
  isSuccess:any;
  responseMessage:any;
  resetForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
  });
  //call the service
  ResetPass() {
    this.isClicked=true;
    this._AuthService.resetPassword(this.resetForm.value).subscribe(data => {
      console.log(data);
      if (data.message == 'Email Sent') {
        this.isClicked=false;
        this.isSuccess=true;
        this.responseMessage=data.message;
      }
      else if (data.message == 'email not Verified') {
        this.isClicked=false;
        this.isSuccess=true;
        this.responseMessage='Verify Your Account';
        console.log('verify email')
      }
      else if (data.message='Email Not Found') {
        this.isClicked=false;
        this.isSuccess=true;
        this.responseMessage='Email Not Found';
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
