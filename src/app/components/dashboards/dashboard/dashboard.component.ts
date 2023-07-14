import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DataFetchService } from 'src/app/shared/services/common.service';
import {  ChartConfiguration } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgCircleProgressModule],
})
export class DashboardComponent  {

  invoiceDetailsData:any[]=[]
  salesActivityData :any;
  data: any[] = [
    { channel: 'other', draft: '31', confirmed: '176', packed: '78', shipped: '56' ,invoiced:'34'},
  ];

constructor(private service: DataFetchService,private router:Router){}
ngOnInit(){
  this.getSalesActivityData(); 
  this.getInvoices();

}
  getSalesActivityData(): void {
    this.service.getData('salesActivity').subscribe((response: any) => {
      console.log(response);
      this.salesActivityData = response;
      console.log(this.salesActivityData)
    });
  }
  
     getInvoices():void{
      this.service.getData('createInvoice').subscribe(res=>{
       this.invoiceDetailsData = res.slice(0, 5);   
       console.log(this.invoiceDetailsData)
      })
     }
     getSerialNumber(index: number): number {
      return index + 1;
    }

    openInvoiceInNewTab(orderId: any) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/invoice-details/${orderId.orderId}`])
      );
    
      window.open(url, '_blank');
    }
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  


}

