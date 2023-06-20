import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-in-voice',
  templateUrl: './in-voice.component.html',
  styleUrls: ['./in-voice.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class InVoiceComponent {
  tableData:[]=[];
  selectedProducts:any



  editProduct(event:any,id:string){

  }
  deleteProduct(product:any){
  }
}
