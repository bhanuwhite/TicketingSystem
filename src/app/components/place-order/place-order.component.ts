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

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent {
  tableData: any = [];
  products_lists: any;
  selectedCountry: any;
  filteredCountries!: any[];
  addProduct!: FormGroup;
  idcount: any;
  productsDemo = [];
  selectedPrice_quantity: any;
  selectedPrice_product: any;
  taxlist: any;
  taxlistdemo: any = tax;
  total_amount = 0;
  quantity: any;
  taxvalue: any;
  data: any;
  tax_amount!: number;
  TotalOrderAmount: number = 0;
  selectedProduct_quantity: any = 1;
  customerLists: any;
  filterCustomer!: any[];

  constructor(private services: DataFetchService, private fb: FormBuilder) {}
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
          Validators.pattern('^[0-9]+$'),
          this.checkQuantityValidator(),
        ],
      ],
      price: [''],
      tax: [''],
      amount: [''],
    });
  }

  getCustomersDetails():void{
    this.services.getData('customerDetails').subscribe((res)=>{
      this.customerLists=res.data.lists;
      console.log(this.customerLists)
    })

  }
  getProducts(): void {
    this.services.getData('select').subscribe((res: any) => {
      this.products_lists = res.data.lists;
    });
  }
  getTax() {
    this.services.getData('taxLists').subscribe((res: any) => {
      this.taxlist = res.taxList;
    });
  }
  ontaxChange(event: any): void {
    const deotax = event.value?.value;
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

      const check = selectedquantity <= selectedProductQuantity;
      return !check ? { passwordStrength: true } : null;
    };
  }

  onQuantityChange(event: any): void {
    this.quantity = event.target.value;

    let tax = this.addProduct?.value['tax']?.value
      ? this.addProduct.value['tax'].value
      : '';
    let totalAmount: any = this.quantity * this.selectedPrice_product;
    this.selectedPrice_quantity = totalAmount + totalAmount * (tax / 100);
    this.addProduct.patchValue({ price: totalAmount });
    this.total_amount = totalAmount;
    this.addProduct.patchValue({ amount: this.selectedPrice_quantity });
  }
  selectProduct(event: any): void {
    this.selectedProduct_quantity = event?.quantity ? event?.quantity : 0;
    this.quantity = 1;
    this.addProduct.patchValue({ quantity: this.quantity });
    this.selectedPrice_product = event?.price;
    this.selectedPrice_quantity = event?.price;
    this.addProduct.patchValue({ price: this.selectedPrice_quantity });
    this.total_amount = !event?.price ? 0 : event?.price * this.quantity; //quantity with product price
    this.addProduct.patchValue({ amount: this.total_amount });
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event?.query;
    if (event.query.length > 1) {
      for (let i = 0; i < this.products_lists.length; i++) {
        let country = this.products_lists[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
        }
      }
    }

    this.filteredCountries = filtered;
  }
  filterCustomers(event: any) {
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
  selectedcustomer(customer_no:any){
 this.addProduct.patchValue({'mobile':customer_no[0].mobile_no})
  }
  add_Product(): void {
    this.getProducts();
    let name = this.addProduct.controls['name'].value.name;
    let quantity = this.addProduct.controls['quantity'].value;
    let tax_percentage = this.addProduct.controls['tax']?.value?.value
      ? this.addProduct.controls['tax']?.value?.value
      : '';

    let price = this.addProduct.controls['price'].value;
    let totalamount = this.addProduct.controls['amount'].value;
    let tax = price * (tax_percentage / 100);

    this.data = {
      productName: name,
      quantity: quantity,
      tax: tax,
      price: price,
      amount: totalamount,
    };

    this.tableData.push(this.data);
    this.TotalOrderAmount = +parseFloat(
      this.TotalOrderAmount + this.data.amount
    ).toFixed(2);
    this.addProduct.controls['name'].reset();
    this.addProduct.controls['quantity'].reset();
    this.addProduct.controls['price'].reset();
    this.addProduct.controls['tax'].reset();
    this.addProduct.controls['amount'].reset();
  }
  removeProduct(index: number): void {
    const removed_item = this.tableData.splice(index, 1);
    let getremoved_amount = removed_item[0].totalamount;
    this.TotalOrderAmount = this.TotalOrderAmount - getremoved_amount;

    // this.TotalOrderAmount=
  }

  placeOrder(): void {
    const formValues = this.addProduct.value;
    const data: [] = this.tableData;
    const body = {
      custName: formValues.customerName.name ,
      mobile: formValues.mobile,
      itemsList: data,
      // totalamount: this.TotalOrderAmount,
    };
    this.tableData = [];
    this.addProduct.reset();
    try {
      console.log(body);
      this.services.postData('tax/order ', body).subscribe((data) => {});
    } catch {}
  }
}
