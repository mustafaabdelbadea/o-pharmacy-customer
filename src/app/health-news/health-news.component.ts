import { Component, OnInit } from '@angular/core';
import {GetHealthNewsService} from "../services/get-health-news.service"

@Component({
  selector: 'app-health-news',
  templateUrl: './health-news.component.html',
  styleUrls: ['./health-news.component.scss']
})
export class HealthNewsComponent implements OnInit {
  
  news:any
  
  constructor(private _GetHealthNewsService:GetHealthNewsService ) 
  {
    _GetHealthNewsService.getnews().subscribe(
      (data)=>{
               this.news=data.articles;    
       },
      (error)=>{
               console.log(error) ;
           })
   
  }

  ngOnInit(): void {
  }

}
