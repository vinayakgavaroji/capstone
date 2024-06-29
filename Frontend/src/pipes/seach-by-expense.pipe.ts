import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seachByExpense'
})
export class SeachByExpensePipe implements PipeTransform {

  transform(expenses: any[], productName: any) {
    if (productName === '') {
      return expenses;
    }
    return expenses.filter(item => item.productName.toLowerCase().includes(productName));
  }

}
