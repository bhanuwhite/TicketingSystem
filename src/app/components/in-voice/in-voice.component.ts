import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataFetchService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-in-voice',
  templateUrl: './in-voice.component.html',
  styleUrls: ['./in-voice.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class InVoiceComponent {
  tableData:[]=[];
  selectedProducts:any
  invoiceDetailsData:any[]=[]
  @ViewChild('dataTable') dataTable!: Table;


  constructor(private Service:DataFetchService,private router:Router){

  }
  
  ngOnInit(){
this.getInvoices();
  }
 getInvoices():void{
  this.Service.getData('createInvoice').subscribe(res=>{
   this.invoiceDetailsData = res;   
   console.log(this.invoiceDetailsData)
  })
 }

 openInvoiceInNewTab(orderId: any) {
  
  // console.log(orderId)
  // const url = `http://192.168.0.248:4300/api/tax/order/invoice/${orderId.orderId}`; 
  // window.open(url, '_blank');
  // Converts the route into a string that can be used 
  // with the window.open() function
  const url = this.router.serializeUrl(
    this.router.createUrlTree([`/invoice-details/${orderId.orderId}`])
  );

  window.open(url, '_blank');
}


  editProduct(event:any,id:string){

  }
  deleteProduct(product:any){
  }
}
