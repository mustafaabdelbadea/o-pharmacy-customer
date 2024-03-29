import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { GetAllMedicineService } from '../services/get-all-medicine.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  allMedicineData: any;
  isOrderd: boolean = true;
  isClicked: any = false;
  returnMessage: any;
  medicineArray: any = [];
  //make base url if uploaded any file not image 
  baseUrl: any = 'data:image/png;base64,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';
  //images types
  fileTypes: any = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  //function to check if the file is image or not
  validFileType(file: any) {
    for (var i = 0; i < this.fileTypes.length; i++) {
      if (file.type === this.fileTypes[i]) {
        return true;
      }
    }

    return false;
  }
  url: any;
  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0].type)
      if (this.validFileType(event.target.files[0])) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          console.log(this.url)
        }
      }
      else {
        console.log('upload image !!');
        //if not image make url = not found 
        this.url = this.baseUrl;
      }
    }
  }
  //form group check data and validation
  orderForm = new FormGroup({
    'orderByTexting': new FormControl(null, [Validators.required]),
  });
  //call the api from service 
  order() {
    this.isClicked = true;
    //save order text and photo in data 
    let data = {
      orderByTexting: this.orderForm.value.orderByTexting,
      orderByPhoto: this.url
    }
    //check if there photo or text and check if url = not found 
    if ((data.orderByTexting == null && data.orderByPhoto == null) || data.orderByPhoto == this.baseUrl) {
      // window.alert('add order');
      this.isClicked = false;
      this.isOrderd = false;
    }
    else {
      this._OrderService.order(data).subscribe(orderData => {
        this.isOrderd = true;

        //check if res = success, logged in 
        if (orderData.message == 'Order saved') {
          this.returnMessage = orderData.message;
          this.orderForm.reset();
          this.url = null;
          setTimeout(() => {
            console.log('test')
            this._Router.navigate(["/customerCurrentOrders"]);

          }, 3000);
          this.isClicked = false;
        }
        else {
          this.isClicked = false;
          this.returnMessage = orderData.message;
          console.log(orderData.message)
        }
      },
        err => {
          console.log(err);
        });
    }

  }
  constructor(private _OrderService: OrderService, private _Router: Router, private _GetAllMedicineService: GetAllMedicineService) {
    _GetAllMedicineService.allMedicine().subscribe((data) => {
      this.allMedicineData = data;
      //make an array and push medicine name into this array 
      for (let index = 0; index < this.allMedicineData.length; index++) {
        this.medicineArray.push(this.allMedicineData[index].medicineName);
      }
    },
      err => {
        console.log(err);
      })
      
      
}
  //pipe search for medicine name 
  public model: any;

  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.medicineArray.filter((v: any) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  //to get selected value from seach input 
  inputFormatBandListValue(value: any) {
    if (value.name) {
      return value.name
    }
    //to get old value from text box then add search value
    $("#write-order").val($("#write-order").val() +value+ '\n') ;
    return value;

  }

  ngOnInit(): void {

  }

}
