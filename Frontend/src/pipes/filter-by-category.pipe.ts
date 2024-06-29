import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(expenses: any[], category: string): any[] {
    if(category === 'all'){
     return expenses;
    }
    return expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase())
  }

}
