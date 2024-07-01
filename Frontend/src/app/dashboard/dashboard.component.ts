import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  barGraph!: Chart;
  totalAmountByCategory: number = 0;
  totalAmountByMonth: number = 0;
  categoryValue: string = '';
  expenseDataByCategory: any[] = [];
  expenseDataByMonth: any[] = [];
  categories: any[] = [];

  constructor(private shared: SharedService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.getAllExpensesInBarGraph();
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
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ]
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
}
