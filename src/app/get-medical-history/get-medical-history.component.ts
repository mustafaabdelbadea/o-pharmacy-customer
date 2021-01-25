import { Component, OnInit } from '@angular/core';
import {CustomerHistoryService} from '../services/customer-history.service'

@Component({
  selector: 'app-get-medical-history',
  templateUrl: './get-medical-history.component.html',
  styleUrls: ['./get-medical-history.component.scss']
})
export class GetMedicalHistoryComponent implements OnInit {
  
   history:any;
  
  constructor(private _CustomerHistoryService:CustomerHistoryService) { 

    _CustomerHistoryService.gethistory().subscribe( (data)=>{
        
      this.history = data; 
      console.log(this.history)
    
    
    },
    err => {
      console.log(err);
    } )    
   }

  ngOnInit(): void {
  }

}
