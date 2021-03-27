import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPharmacy'
})
export class SearchPharmacyPipe implements PipeTransform {
  transform(pharmacies: any, text:string): any {
    if(text==undefined){
      return pharmacies 
    }

    return pharmacies.filter(function(pharmacy:any){
        return pharmacy.name.toLowerCase().includes(text.toLowerCase())||pharmacy.locationAsAddress.toLowerCase().includes(text.toLowerCase());
    })
  }


}
