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
  productsDemo=[];
  // @ViewChild('autoComplete', { static: false }) autoComplete!: AutoComplete;
  selectedPrice: any;

  constructor(private services: DataFetchService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getProducts();
    this.productinit();
  }

  productinit(): void {
    this.addProduct = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['1', [Validators.required, Validators.pattern('^[0-9]+$')]],
      price: [''],
      tax: ['', [Validators.required]],
    });
  }

  getProducts(): void {
    this.services.getData('select').subscribe((data: any) => {
      console.log(data.lists);
      this.countries = data.lists;
    });
  }
  onQuantityChange(event: any): void {
    console.log(event.target.value);
  }
  selectProduct(event: any): void {
    this.selectedPrice = event?.price;
    console.log(event?.price);
    this.addProduct.patchValue({'price': this.selectedPrice});
  }

  filterCountry(event: any) {
    console.log(event.query);
    let filtered: any[] = [];
    let query = event.query;
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
}
