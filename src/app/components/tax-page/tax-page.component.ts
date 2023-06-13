import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css'],
})
export class TaxPageComponent {
  productDialog!: boolean;
  visible!: boolean;
  submitted!: boolean;
  date1!: Date;
  date2!: Date;
  value!: string;
  startDate!: Date;
  endDate!: Date;
  taxForm!: FormGroup;
  checknew!: boolean;
  checkEdit!: boolean;
  taxes!: any[];
  taxesList!: any[];
  selectedTax!: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: DataFetchService,
    private router: Router
  ) {}

  showDialog() {
    this.visible = true;
  }
  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }
  saveProduct() {}
  ngOnInit() {
    this.taxFormValidation();
    this.getTaxList();
  }
  taxFormValidation(): void {
    this.taxForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      startDate: ['', [Validators.required, Validators.pattern('')]],
      endDate: [''],
      percentage: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  openNew() {
    this.submitted = false;
    this.checknew = true;
    this.checkEdit = false;
    this.visible = true;
    this.taxForm.reset();
  }
  getTaxList() {
    this.service.getData('tax').subscribe((res) => {
      console.log(res.data);

      this.taxesList = res.data.data;
      console.log(this.taxesList);
    });
  }
  submitTaxForm(): void {
    const formVaules = this.taxForm.value;

    const obj = {
      startDate: formVaules.startDate,
      endDate: formVaules.endDate,
    };
    const jsonstringObj = JSON.stringify(obj);

    const data = {
      name:formVaules.name,
      period:obj,
      percentage:formVaules.percentage

    }
 
console.log(data);
    this.service.postData('tax', data).subscribe((response) => {
      console.log(response);

      if (response.data.status === '201') {
        alert('successful');
      } else {
        alert('Something went wrong');
      }
    });
  }

  
}

