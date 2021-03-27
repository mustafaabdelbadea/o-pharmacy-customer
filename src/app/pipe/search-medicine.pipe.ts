import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMedicine'
})
export class SearchMedicinePipe implements PipeTransform {
  transform(medicines: any, text:string): any {
    if(text==undefined){
      return null 
    }

    return medicines.filter(function(medicine:any){
        return medicine.name.toLowerCase().includes(text.toLowerCase());
    })
  }

}
