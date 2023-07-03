import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-in-voice',
  templateUrl: './in-voice.component.html',
  styleUrls: ['./in-voice.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class InVoiceComponent {
  tableData:[]=[];
  selectedProducts:any

  constructor(private Service:DataFetchService){

  }
  
  ngOnInit(){
this.getInvoices();
  }
 getInvoices():any{
  this.Service.getData('tax/order/invoice').subscribe(res=>{
console.log(res);
  })
 }
  editProduct(event:any,id:string){

  }
  deleteProduct(product:any){
  }
}
