import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ReportService} from '../services/report.service';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {
  message:any;
  isClicked: any = false;
  //get token from local storage
  token: any = localStorage.getItem('token');
  //decode token
  decoded: any = jwt_decode(this.token);
  //get data from form
  reoportForm = new FormGroup({
    'problem': new FormControl(null, [Validators.required]),
  });
  report() {
    this.isClicked=true;

    //make data json and send it to back end
    let data = {
      token: this.token,
      name: this.decoded.name,
      phone: this.decoded.phone,
      role: 'customer',
      email:this.decoded.email,
      problem: this.reoportForm.value.problem
    }
    this.reoportForm.reset();

    this._ReportService.reportProblem(data).subscribe(d => {
      if(d.message=='email sent'){
        this.message='email sent';
        this.isClicked=false;
      }
      console.log(d)
    },
      err => {
        console.log(err);
      })
   
  }


  constructor(private _ReportService: ReportService, private _Router: Router) {
  }

  ngOnInit(): void {
  }

}
