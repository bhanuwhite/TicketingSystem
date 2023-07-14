import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { tax } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  providers: [MessageService],
})
export class PlaceOrderComponent {
  tableData: any = [];
  products_lists: any;
  selectedCountry: any;
  filteredProduct!: any[];
  addProduct!: FormGroup;
  idcount: any;
  productsDemo = [];
  selectedPrice_quantity: any;
  selectedPrice_product: any;
  taxlist: any;
  total_amount = 0;
  quantity: any;
  taxvalue: any;
  data: any;
  tax_amount!: number;
  TotalOrderAmount: number = 0;
  selectedProduct_quantity: any = 1;
  customerLists: any;
  filterCustomer!: any[];
  productsClone: any;
  showQuantity: any;

  constructor(
    private services: DataFetchService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.getProducts();
    this.productinit();
    this.getTax();
    this.getCustomersDetails();
  }

  productinit(): void {
    this.addProduct = this.fb.group({
      customerName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      name: ['', [Validators.required]],
      quantity: [
        '1',
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
          this.checkQuantityValidator(),
        ],
      ],
      price: [''],
      tax: [''],
      amount: [''],
    });
  }

  getCustomersDetails(): void {
    this.services.getData('customerDetails').subscribe((res) => {
      this.customerLists = res.data.lists;
      console.log(this.customerLists);
    });
  }
  getProducts(): void {
    this.services.getData('select').subscribe((res: any) => {
      this.products_lists = res.data.lists;

      this.productsClone = this.products_lists;
    });
  }
  getTax(): void {
    this.services.getData('taxLists').subscribe((res: any) => {
      this.taxlist = res.taxList;
    });
  }
  ontaxChange(event: any): void {
    const deotax = event.value?.percentage;
    let total_amount = this.total_amount + this.total_amount * (deotax / 100);
    this.addProduct.patchValue({ amount: total_amount });
  }
  checkQuantityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const selectedquantity = value;
      const selectedProductQuantity = this.selectedProduct_quantity;
      this.showQuantity = selectedProductQuantity;

      const check = selectedquantity <= selectedProductQuantity;
      return !check ? { quantityCheck: true } : null;
    };
  }

  onQuantityChange(event: any): void {
    this.quantity = event.target.value;

    let tax = this.addProduct?.value['tax']?.percentage
      ? this.addProduct.value['tax'].percentage
      : '';
    let totalAmount: any = this.quantity * this.selectedPrice_product;
    this.selectedPrice_quantity = totalAmount + totalAmount * (tax / 100);
    this.addProduct.patchValue({ price: totalAmount });
    this.total_amount = totalAmount;
    this.addProduct.patchValue({ amount: this.selectedPrice_quantity });
  }
  selectProduct(event: any): void {
    this.selectedProduct_quantity = event?.quantity;
    this.quantity = 1;
    this.addProduct.patchValue({ quantity: this.quantity });
    this.selectedPrice_product = event?.price;
    this.selectedPrice_quantity = event?.price;
    this.addProduct.patchValue({ price: this.selectedPrice_quantity });
    this.total_amount = !event?.price ? 0 : event?.price * this.quantity; //quantity with product price
    this.addProduct.patchValue({ amount: this.total_amount });
  }

  filterProduct(event: any): void {
    let filtered: any[] = [];
    let query = event?.query;
    if (event.query.length > 1) {
      for (let i = 0; i < this.productsClone.length; i++) {
        let country = this.productsClone[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
        }
      }
    }

    this.filteredProduct = filtered;
    console.log(this.filteredProduct);
  }
  filterCustomers(event: any): void {
    let filtered: any[] = [];
    let query = event?.query;
    if (event.query.length > 1) {
      for (let i = 0; i < this.customerLists.length; i++) {
        let country = this.customerLists[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
        }
      }
    }

    this.filterCustomer = filtered;
  }
  selectedcustomer(customer_no: any) {
    this.addProduct.patchValue({ mobile: customer_no[0].mobile_no });
  }

  add_Product(): void {
    let formvalues = this.addProduct.value;
    let product_id = formvalues.name.id;
    let product_quantity = formvalues.quantity;
    this.productsClone.map((x: any) => {
      if (x.id == product_id) {
        x.quantity = x.quantity - product_quantity;
      }
    });
    console.log(this.productsClone);
    console.log(this.tableData);
    let name = this.addProduct.controls['name'].value.name;
    let id = this.addProduct.controls['name'].value.id;
    let quantity = this.addProduct.controls['quantity'].value;
    let tax_percentage = this.addProduct.controls['tax']?.value?.percentage
      ? this.addProduct.controls['tax']?.value?.percentage
      : '';

    let price = this.addProduct.controls['price'].value;
    let totalamount = this.addProduct.controls['amount'].value;
    let tax = price * (tax_percentage / 100);

    this.data = {
      id: id,
      productName: name,
      quantity: quantity,
      tax: tax,
      price: price,
      amount: totalamount,
    };

    const existingProduct = this.tableData.find(
      (x: any) => x.productName === this.data.productName
    );
    console.log(existingProduct);
    if (existingProduct) {
      existingProduct.quantity =
        +this.data.quantity + +existingProduct.quantity;
      console.log(existingProduct.quantity);

      console.log(this.data.price);

      existingProduct.price = this.data.price + existingProduct.price;
      console.log(existingProduct.price);
      existingProduct.tax = this.data.tax + existingProduct.tax;
      console.log(existingProduct.tax);
      existingProduct.amount = this.data.amount + existingProduct.amount;
      console.log(existingProduct.amount);
      console.log(this.tableData);
    } else {
      this.tableData.push(this.data);
    }

    console.log(this.tableData);
    this.TotalOrderAmount = +parseFloat(
      this.TotalOrderAmount + this.data.amount
    ).toFixed(2);
    this.addProduct.controls['name'].reset();
    this.addProduct.controls['quantity'].reset();
    this.addProduct.controls['price'].reset();
    this.addProduct.controls['tax'].reset();
    this.addProduct.controls['amount'].reset();
  }
  removeProduct(product: any): void {
    const index = this.tableData.indexOf(product);
    console.log(this.tableData[index].id);

    this.productsClone.map((x: any) => {
      if (x.id == this.tableData[index].id) {
        x.quantity = x.quantity + this.tableData[index].quantity;
        console.log(x.quantity);
      }
    });
    console.log(this.productsClone);
    const removed_item = this.tableData.splice(index, 1);

    let getremoved_amount = removed_item[0].totalamount;
    this.TotalOrderAmount = this.TotalOrderAmount - getremoved_amount;

    // this.TotalOrderAmount=
  }

  placeOrder(): void {
    const formValues = this.addProduct.value;
    let key = 'id';
    let newArray = this.tableData.map(({ [key]: omittedKey, ...rest }) => rest);
    console.log(newArray);
    const data: [] = newArray;
    console.log(formValues.customerName.name);
    const body = {
      custName: formValues.customerName.name,
      mobile: formValues.mobile,
      itemsList: data,
    };
    this.tableData = [];
    this.addProduct.reset();
    try {
      // this.services.postData('tax/order', body).subscribe({
      //   next: (res: any) => {
      //     if (res.data.status === '201') {
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Successful',
      //         detail: 'Product Created',
      //         life: 3000,
      //       });
      //       // this.getProducts();
      //     }
      //   },
      //   error: (err: HttpErrorResponse) => {
      //     if (err.error.data.status == 400) {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'error',
      //         detail: 'Product code already exists',
      //         life: 3000,
      //       });
      //     } else {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'error',
      //         detail: 'Something went wrong',
      //         life: 3000,
      //       });
      //     }
      //   },
      // });

      this.services.postData('tax/order', body).subscribe({
        next: (res: any) => {
          if (res.data.status === '201') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Created',
              life: 3000,
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.data.status == 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Product code already exists',
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Something went wrong',
              life: 3000,
            });
          }
        },
      });
    } catch { }
  }
  onCancel() {
    this.addProduct.reset();
    this.tableData = [];
  }
}
