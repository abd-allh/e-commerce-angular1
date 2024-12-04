import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../home/home.model';

@Pipe({
  name: 'searchPipe',
})
export class searchPipe implements PipeTransform {
  transform(arrObject: Product[], term: string): Product[] {
    if (!term.trim()) {
      return arrObject;
    }
    return arrObject.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase().trim())
    );
  }
}
