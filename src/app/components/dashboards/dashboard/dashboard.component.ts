import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { NgCircleProgressModule } from 'ng-circle-progress';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgCircleProgressModule],
})
export class DashboardComponent  {
  data: any[] = [
    { channel: 'other', draft: '31', confirmed: '176', packed: '78', shipped: '56' ,invoiced:'34'},
  ];
  chart!: Chart;
   ngOnInit(){
this.renderChart();
   }

 renderChart() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

 const barchat = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  this.chart= barchat;
 }
}

