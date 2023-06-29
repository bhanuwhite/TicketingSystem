import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { ProductService } from 'src/app/shared/constant';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class CustomerComponent implements OnInit{

  productDialog: boolean = false;

  products!: any[];

  product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;
  customerForm!: FormGroup;

 constructor(  private formBuilder: FormBuilder,){}
  ngOnInit(): void {
    this.customerFormValidation();
  }
  openNew() {
    this.productDialog = true;
}
customerFormValidation(): void {
  this.customerForm = this.formBuilder.group({
    customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    mobileNumber: ['', [Validators.required,  Validators.pattern('^[0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]],
  });
}

deleteSelectedProducts(){

}
hideDialog(){
this.productDialog=false;
this.customerForm.reset();
}
}
