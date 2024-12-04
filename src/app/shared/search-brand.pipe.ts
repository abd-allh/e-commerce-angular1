import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBrand',
})
export class SearchBrandPipe implements PipeTransform {
  transform(arrObject: any, term: string): any {
    if (!term) return arrObject;
    return arrObject.filter((obj: any) => {
      return obj.name.toLowerCase().includes(term.toLowerCase());
    });
  }
}
