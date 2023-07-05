import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent {
  id: any;
  itemId: any;
  invoiceDetailsData: any[] = [];
  productDetails:any[]=[]
  path = this.route.snapshot.params['id'];
  constructor(
    private service: DataFetchService,
    private route: ActivatedRoute
  ) {
  
   }
  ngOnInit() {
    console.log('hi')
    console.log(this.path,'i')
    this.getInvoiceDetails();
  }
  data: any[] = [
    {
      channel: '1',
      draft: '31',
      confirmed: '75',
      packed: '78',
      shipped: '56',
      invoiced: '656',
    },
    {
      channel: '2',
      draft: '45',
      confirmed: '98',
      packed: '34',
      shipped: '25',
      invoiced: '965',
    },
  ];

  getInvoiceDetails() {
    this.service
      .getData('tax/order/invoice/'+this.path)
      .subscribe((response: any) => {
        this.invoiceDetailsData = response.invoice;
        console.log(this.invoiceDetailsData);
        this.productDetails = response.invoice[0].items
        console.log(this.productDetails);
        
      });
  }
  getSerialNumber(index: number): number {
    return index + 1;
  }
}
