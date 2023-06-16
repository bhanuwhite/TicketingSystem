import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataFetchService } from 'src/app/shared/services/common.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css'],
  providers: [MessageService, ConfirmationService],
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
  taxFormData: any[] = [];
  searchText: string = '';
  tax:any;
  // taxesList!: any[];
  // selectedTax!: string;
  // formDataValues:any[]=[];
  // taxesData:any;
  // submittedFormData: any;
  // taxData!: any[];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private service: DataFetchService,
    
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
    this.getTaxFormData();
  }

  taxFormValidation(): void {
    this.taxForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      startDate: ['', [Validators.required]],
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

  setFormValues(tax: any) {
    this.taxForm.patchValue({
      name: tax.productName,
      startDate: tax.period.startDate,
      endDate: tax.period.endDate,
      percentage: tax.percentage,
      
    });
  }

  getTaxFormData() {
    this.service.getData('tax').subscribe((response: any) => {
      this.taxFormData = response.data.data;
      console.log(this.taxFormData);
      // this.applySearchFilter();
    });
    console.log(this.taxFormData);
  }
  // applySearchFilter() {
  //   if (this.searchText.trim() !== '') {
  //     const searchValue = this.searchText.toLowerCase();
  //     this.taxFormData = this.taxFormData.filter((item: any) =>
  //       item.name.toLowerCase().includes(searchValue)
  //     );
  //   } else {
  //     this.taxFormData = this.taxFormData; 
  //   }
  // }


  // searchTable() {
  //   if (this.searchText.trim() === '') {
  //     this.getTaxFormData(); 
  //   } else {
  //     this.applySearchFilter();
  //   }
  // }

  submitTaxForm(): void {
    const formVaules = this.taxForm.value;

    const obj = {
      startDate: formVaules.startDate,
      endDate: formVaules.endDate,
    };
    const jsonstringObj = JSON.stringify(obj);

    const data = {
      name: formVaules.name,
      period: obj,
      percentage: formVaules.percentage,
    };

    console.log(data);
    this.service.postData('tax', data).subscribe((response) => {
      console.log(response);
      this.getTaxFormData();
    });
  }
  
  
  
}
