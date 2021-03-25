import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  token: any;
  isClicked:any=false;
  isSuccess:any;
  responseMessage:any;
  //take data from form and check validation
  ResetForm = new FormGroup({
    'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  });
  //call reset password service api 
  ResetPass() {
    this.isClicked=true;
    
    console.log(this.ResetForm.value)
    //take the token from the url
    this._AuthService.forgotPassword(this.ResetForm.value, this.token).subscribe(data => {
      this.isClicked=false;
        this.isSuccess=true;
        this.responseMessage=data.message;
      
      console.log(data)
    },
      err => {
        console.log(err);
      });
  }
  constructor(private _AuthService: AuthService, private _Router: Router, private _ActivatedRoute: ActivatedRoute,private elementRef: ElementRef) {
    this.token = _ActivatedRoute.snapshot.paramMap.get("token");
  }
    
  ngAfterViewInit(){



 }
  ngOnInit(): void {
  }
}
