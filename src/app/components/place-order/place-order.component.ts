import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select_product, tax } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent {
  tableData: any = [];
  countries: any = Select_product.data.lists;
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

  constructor(private services: DataFetchService, private fb: FormBuilder) {}
  ngOnInit(): void {
    // this.getProducts();
    this.productinit();
    this.getTax();
  }

  productinit(): void {
    this.addProduct = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['1', [Validators.required, Validators.pattern('^[0-9]+$')]],
      price: [''],
      tax: [''],
      amount: [''],
    });
  }

  getProducts(): void {
    this.services.getData('select').subscribe((res: any) => {
      this.countries = res.data.lists;
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
      for (let i = 0; i < this.countries.length; i++) {
        let country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
        }
      }
    }

    this.filteredCountries = filtered;
  }

  add_Product() {
    let name = this.addProduct.controls['name'].value.name;
    let quantity = this.addProduct.controls['quantity'].value;
    let tax = this.addProduct.controls['tax']?.value?.value
      ? this.addProduct.controls['tax']?.value?.value
      : '';
    let price = this.addProduct.controls['price'].value;
    let totalamount = this.addProduct.controls['amount'].value;
    this.data = {
      name: name,
      quantity: quantity,
      tax: tax,
      price: price,
      totalamount: totalamount,
    };
    console.log(this.data);

    this.tableData.push(this.data);
    console.log(this.tableData);
    this.addProduct.reset();
    
  };
  removeProduct(index:number):void {
    this.tableData.splice(index, 1);

  }
}
