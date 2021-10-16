import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: User[], term: string): User[] {
    if (!value) return [];
    if (!term) return value;

    term = term.toLowerCase();
    const users = [...value.filter(user => user.name.toLocaleLowerCase().includes(term)
      || user.email.toLowerCase().includes(term)
      || user.role.toLowerCase().includes(term))];
    return users;
  }
}