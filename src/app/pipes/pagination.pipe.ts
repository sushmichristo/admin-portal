import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], page: number, searchText: string): any {
    //console.log(page, ...value.slice(10 * (page - 1), 10 * (page)));
    if (!value) return [];
    if (searchText && searchText != '') {
      return [...value.slice(0, 10)];
    }
    return [...value.slice(10 * (page - 1), 10 * (page))]
  }
}
