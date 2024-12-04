import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../home/home.model';

@Pipe({
  name: 'searchCategory',
})
export class SearchCategoryPipe implements PipeTransform {
  transform(arrObject: Category[], term: string): Category[] {
    if (!term.trim()) {
      return arrObject;
    }
    return arrObject.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase().trim())
    );
  }
}
