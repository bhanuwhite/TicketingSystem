import { Component, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
}
