import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
  //to add backgound (color || image ) to only this page
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e2e6ea';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = "cover";
  }
}
