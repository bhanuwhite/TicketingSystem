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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css'],
  providers: [MessageService, ConfirmationService, DatePipe],
})
export class TaxPageComponent {
  selectedDateRange!: Date[];
  visible!: boolean;
  date1!: Date;
  date2!: Date;
  startDate!: Date;
  endDate!: Date;
  taxForm!: FormGroup;
  checknew!: boolean;
  checkEdit!: boolean;
  taxFormData: any[] = [];
  tax_Id: any;
  selectedProducts: any[] = [];
  checkform_status: any;
  submitted!: boolean;
  isEditing: boolean = false;
  edit: boolean = false;
  editId: any;
  selectedTaxes: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private service: DataFetchService,
    private datePipe: DatePipe
  ) {}

  showDialog() {
    this.taxForm.reset();
    this.edit = false;
    if (!this.edit) {
      this.selectedDateRange = [new Date(), new Date()];
      
    }
    this.visible = true;
  }
  hideDialog() {
    this.visible = false;
  }

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

  getTaxFormData(): void {
    this.service.getData('tax').subscribe((response: any) => {
      this.taxFormData = response.data.data;
    });
  }

  onsubmit() {
    if (this.taxForm.invalid) {
      return;
    }
    if (this.isEditing) {
    }
  }

  submitTaxForm(): void {
    const formVaules = this.taxForm.value;
    const obj = {
      startDate: formVaules.startDate,
      endDate: formVaules.endDate,
    };
    const data = {
      name: formVaules.name,
      period: obj,
      percentage: formVaules.percentage,
    };
    if (this.edit) {
      try {
        this.service
          .putData('tax/' + this.editId, data)
          .subscribe((response) => {
            console.log(response);
            if (response.status === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Tax Updated',
                life: 3000,
              });
              this.visible = false;
              this.taxForm.reset();
              this.getTaxFormData();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Something went wrong',
                life: 3000,
              });
            }
          });
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
          life: 3000,
        });
      }
      //===========================================
      // this.service.putData('tax/' + this.editId, data).subscribe((response) => {
      //   this.visible = false;
      //   this.taxForm.reset();
      //   this.getTaxFormData();

      // });
    } else {
      try {
        this.service.postData('tax', data).subscribe((response) => {
          console.log(response);
          if (response.data.status === '201') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tax created',
              life: 3000,
            });
            this.visible = false;
            this.taxForm.reset();
            this.getTaxFormData();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Something went wrong',
              life: 3000,
            });
          }
        });
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
          life: 3000,
        });
      }

      //==============================================
      // this.service.postData('tax', data).subscribe((response) => {
      //   this.visible = false;
      //   this.taxForm.reset();
      //   this.getTaxFormData();

      // });
    }
  }
  onEdit(x: any, edit: string) {
    this.editId = x._id;
    this.edit = true;
    this.checkform_status = edit;
    if (this.checkform_status === 'edit') {
      const startDate = new Date(x.period.startDate);
      const endDate = new Date(x.period.endDate);
      this.selectedDateRange = [startDate, endDate];
      this.taxForm.patchValue({ startDate, endDate });
      this.visible = true;
      this.taxForm.patchValue({
        name: x.name,
        percentage: x.percentage,
      });
    }
  }

  deleteTax(tax: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + tax.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          const tax_id = [];
          tax_id.push(tax._id);
          const data = {
            itemIds: tax_id,
          };
          this.service.patchData('deleteTax', data).subscribe((res) => {
            if (res.data.status === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Tax Deleted',
                life: 3000,
              });
              this.getTaxFormData();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Something went wrong',
                life: 3000,
              });
            }
          });
        } catch (err) {
          if (err) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Something went wrong',
              life: 3000,
            });
          }
        }
      },
    });
  }
  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected taxes?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.taxFormData = this.taxFormData.filter(
  //         (val: any) => !this.selectedProducts.includes(val)
  //       );
  //       this.selectedProducts = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Selected  taxes deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  deleteSelectedTaxes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected taxes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          const taxIds = this.selectedProducts.map((tax: any) => tax._id);
          const data = {
            itemIds: taxIds,
          };
          this.service.patchData('deleteTax', data).subscribe((res) => {
            if (res.data.status === '200') {
              this.taxFormData = this.taxFormData.filter(
                (val: any) => !this.selectedProducts.includes(val)
              );
              this.selectedTaxes = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Selected taxes deleted',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong',
                life: 3000,
              });
            }
          });
        } catch (err) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 3000,
          });
        }
      },
    });
  }
}
