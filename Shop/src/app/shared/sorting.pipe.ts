import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "./interfaces";
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type=''): any {
    if (!products.filter) return [];
    return products.filter(products=> {
      return products.type == type
    })
  }






}
