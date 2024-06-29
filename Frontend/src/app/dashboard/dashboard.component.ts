import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  barGraph!: Chart;
  pieChart!: Chart;
  totalAmountByCategory: number = 0;
  totalAmountByMonth: number = 0;
  categoryValue: string = '';
  expenseDataByCategory: any[] = [];
  expenseDataByMonth: any[] = [];
  categories: any[] = [];

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.getAllExpensesInBarGraph();

    // this.getAllExpensesByMonth();
  }

  getAllExpensesInBarGraph() {
    this.barGraph = new Chart('barGraph', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Expenses by category bar',
            data: [],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.shared.calculateTotalAmountByCategory().subscribe((eachCategory) => {
      eachCategory.filter((item: any) => {
        this.barGraph.data.labels?.push(item._id);
        this.barGraph.data.datasets[0].data.push(item.totalAmount);
      });
    });
  }

  // getAllExpensesByMonth(){

  // const monthlyTotals : any = {};

  // this.addExpenseService.getAllExpense().subscribe((data) => {

  // this.expenseDataByMonth = data;

  // this.expenseDataByMonth.forEach((expense) => {

  // let date = new Date(expense.date);

  // const month = date.getMonth() + 1

  // // this.totalAmountByMonth = this.expenseDataByMonth.filter(item => {

  // // let d = new Date(item.date);

  // // let m = (d.getMonth()+1);

  // // return month === m;

  // // }).reduce((sum, item) => sum + item.amount,0)

  // monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;

  // this.pieChart.data.datasets[0].data.push(monthlyTotals[month]);

  // return this.pieChart.data

  // })

  // })

  // }
}
