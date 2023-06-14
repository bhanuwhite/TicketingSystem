import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { countries } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent {
  countries!: any;
  selectedCountry: any;
  filteredCountries!: any[];
  addProduct!: FormGroup;
  idcount: any;
  productsDemo = [];
  // @ViewChild('autoComplete', { static: false }) autoComplete!: AutoComplete;
  selectedPrice_quantity: any;
  selectedPrice_product: any;
  taxlist: any;

  constructor(private services: DataFetchService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getProducts();
    this.productinit();
    this.getTax();
  }

  productinit(): void {
    this.addProduct = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['1', [Validators.required, Validators.pattern('^[0-9]+$')]],
      price: [''],
      tax: ['', [Validators.required]],
      amount: [''],
    });
  }

  getProducts(): void {
    this.services.getData('select').subscribe((res: any) => {
      console.log(res.data.lists);
      this.countries = res.data.lists;
    });
  }
  getTax(){
    this.services.getData('taxLists').subscribe((res: any) => {
      console.log(res.taxList);
      this.taxlist=res.taxList;
    })
  }
  onQuantityChange(event: any): void {
    console.log(event.target.value);
    this.selectedPrice_quantity = event.target.value * this.selectedPrice_product;
    console.log(this.selectedPrice_quantity);
    this.addProduct.patchValue({ price: this.selectedPrice_quantity });
  }
  selectProduct(event: any): void {
    this.selectedPrice_product = event?.price;
    this.selectedPrice_quantity = event?.price;
    console.log(event?.price);
    this.addProduct.patchValue({ price: this.selectedPrice_quantity });
  }

  filterCountry(event: any) {
    console.log(event.query);
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
    console.log(this.filteredCountries);
  }
}
