import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  //take email from form
  resetForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
  });
  //call the service
  ResetPass() {
    this._AuthService.resetPassword(this.resetForm.value).subscribe(data => {
      console.log(data);
      if (data.message == 'success') {
        localStorage.setItem('token', data.token);
        this._Router.navigateByUrl("/home");
      }
      else if (data.message == 'email not Verified') {
        console.log('verify email')
      }
      else {
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
