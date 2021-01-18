import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {EditProfileService} from '../services/edit-profile.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editNameForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)])
  //   'phones': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
  //   'email': new FormControl(null, [Validators.required, Validators.email]),
  //   'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  //   'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  //   'locationAsAddress': new FormControl(null, [Validators.required]),
  //   'building': new FormControl(null, [Validators.required]),
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
  
  
  constructor(private _EditProfileService :EditProfileService) { }


  ngOnInit(): void {
  }

}
