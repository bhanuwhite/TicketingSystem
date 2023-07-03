import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataFetchService } from 'src/app/shared/services/common.service';

// import { ProductService } from 'src/app/shared/constant';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CustomerComponent implements OnInit {
  productDialog: boolean = false;

  products!: any[];

  // product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;
  customerForm!: FormGroup;
  customerDetails: any[] = [];
  customer_id:any;
  selectedCustomer:any[]=[];
  edit: boolean = false;
  editId: any;
  checkform_status: any;
  checkEdit!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private service: DataFetchService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.customerFormValidation();
    this.getCustomerDetails();
  }
  openNew() {
    this.productDialog = true;
  }
  customerFormValidation(): void {
    this.customerForm = this.formBuilder.group({
      customerName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  deleteSelectedProducts() {}
  hideDialog() {
    this.productDialog = false;
    this.customerForm.reset();
  }

  getCustomerDetails() {
    this.service.getData('customerDetails').subscribe((res) => {
      console.log(res);
      this.customerDetails = res.data.lists;
      console.log(this.customerDetails);
    });
  }

  // onSubmitCustomerForm() : void {
  //   const formVaules = this.customerForm.value;
  //   const data = {
  //     name: formVaules.customerName,
  //     mobile_no: formVaules.mobileNumber,
  //   };
  //   this.service.postData('customerDetails', data).subscribe((res: any) => {
  //     console.log(res);
  //     this.getCustomerDetails();
  //     this.productDialog = false;
  //     this.customerForm.reset();
  //   });
  // }

  onSubmitCustomerForm(): void {
    const formVaules = this.customerForm.value;
    const data = {
      name: formVaules.customerName,
      mobile_no: formVaules.mobileNumber,
    };
    if (this.edit) {
      try {
        this.service
          .putData('customerDetails/' + this.editId, data)
          .subscribe((response) => {
            console.log(response);
            if (response.data.status === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Customer Updated',
                life: 3000,
              });
              this.productDialog = false;
              this.customerForm.reset();
              this.getCustomerDetails();
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
      
    } else {
      try {
        this.service.postData('customerDetails', data).subscribe((response) => {
          console.log(response);
          if (response.data.status === '201') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Customer created',
              life: 3000,
            });
            this.productDialog = false;
            this.customerForm.reset();
            this.getCustomerDetails();
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

    }
  }


  onEditCustomer(customer:any,edit:string){
    this.editId = customer.id;
    this.edit = true;
    this.checkform_status = edit;
    if (this.checkform_status === 'edit') {
        this.checkEdit = true;
        this.productDialog = true;
         this.customerForm.patchValue({
          customerName: customer.name,
          mobileNumber: customer.mobile_no,
        });
      
    }
  }

  onDeleteCustomer(customer: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + customer.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          const customer_id = customer.id;
          const data = {
            itemIds: [customer_id],
        };
          this.service.patchData('customerDetails', data).subscribe((res) => {
            if (res.data.status === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Customer Deleted',
                life: 3000,
              });
              this.getCustomerDetails();
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

  deleteSelectedCustomer() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected taxes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          const customerIds = this.selectedCustomer.map((customer: any) => customer.id);
          const data = {
            itemIds: customerIds,
          };
          this.service.patchData('customerDetails', data).subscribe((res) => {
            if (res.data.status === '200') {
              this.customerDetails = this.customerDetails.filter(
                (val: any) => !this.selectedCustomer.includes(val)
              );
              // this.selectedTaxes = [];
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
