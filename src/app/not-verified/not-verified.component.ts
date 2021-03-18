import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
  styleUrls: ['./not-verified.component.scss']
})
export class NotVerifiedComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#eee';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize= "cover";


 }
}
