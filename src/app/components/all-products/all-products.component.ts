import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { productconst } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';
import * as Papa from 'papaparse';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AllProductsComponent {
  productDialog!: boolean;

  products: any;

  product: any;

  selectedProducts: any;

  submitted!: boolean;
  visible!: boolean;
  productConst: any = productconst;
  addProductForm!: FormGroup;
  categoryList!: any[];
  categoryName: string = 'Select Category';
  initalStatus: string = 'Select Inventory Status';
  files: File[] = [];
  statusList: any;
  statuses = [
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' },
  ];
  placeholderOption: any = { label: 'Select an option', value: '' };
  checkEdit!: boolean;
  checknew!: boolean;
  editSubmitCheck!: string;
  product_id!: string;
  @ViewChild('dataTable') dataTable!: Table;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private service: DataFetchService
  ) {}
  ngOnInit() {
    this.productsInit();
    this.getcategory();
    this.getstatus();
    this.getProducts();
  }

  exportToCSV() {
    const data = this.dataTable.value;
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getcategory(): void {
    this.service.getData('listCategory').subscribe((res) => {
      this.categoryList = res.categoryList;
      console.log(this.categoryList);
    });
  }
  getstatus(): void {
    this.service.getData('status').subscribe((res) => {
      this.statusList = res.data.inventoryStatus;
      console.log(this.statusList);
    });
  }
  productsInit(): void {
    this.addProductForm = this.fb.group({
      productName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      productCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      quantity: ['', [Validators.required, , Validators.pattern('^[0-9]+$')]],
      category: ['', Validators.required],
      inventoryStatus: ['', Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  getProducts() {
    this.service.getData('displayProduct').subscribe((res) => {
      this.products = res.allProducts;
      console.log(this.products);
    });
  }
  onFileChange(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
  }
  openNew() {
    this.submitted = false;
    this.checknew = true;
    this.checkEdit = false;
    this.visible = true;
    this.addProductForm.reset();
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val: any) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: any, editForm: any) {
    this.editSubmitCheck = editForm;
    this.product_id = product._id;
    this.setFormValues(product);
    this.visible = true;
    this.checknew = false;
    this.checkEdit = true;
  }
  setFormValues(product: any) {
    this.addProductForm.patchValue({
      productName: product.productName,
      productCode: product.productCode,
      productDescription: product.productDescription,
      inventoryStatus: product.inventoryStatus,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.service
            .getData('deleteProduct/' + product.id)
            .subscribe((res) => {
              if (res.data.status === '200') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Deleted',
                  life: 3000,
                });
                this.getProducts();
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
          console.log(err);
        }
      },
    });
  }

  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.editSubmitCheck === 'edit') {
      try {
        if (this.addProductForm.valid) {
          const formVaules = this.addProductForm.value;
          const formData = new FormData();
          formData.append('productName', formVaules.productName);
          formData.append('productCode', formVaules.productCode);
          formData.append('price', formVaules.price);
          formData.append('quantity', formVaules.quantity);
          formData.append('category', formVaules.category);
          formData.append('inventoryStatus', formVaules.inventoryStatus);
          formData.append('productDescription', formVaules.productDescription);
          for (let i = 0; i < this.files.length; i++) {
            formData.append('image', this.files[i]);
          }

          console.log('checkin POST body', formData);

          this.service
            .postData('display/' + this.product_id, formData)
            .subscribe((response: any) => {
              if (response.data.status === '201') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Update',
                  life: 3000,
                });
                this.visible = false;
                this.getProducts();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'error',
                  detail: 'Something went wrong',
                  life: 3000,
                });
              }
            });
        }
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
        if (this.addProductForm.valid) {
          const formVaules = this.addProductForm.value;
          const formData = new FormData();
          formData.append('productName', formVaules.productName);
          formData.append('productCode', formVaules.productCode);
          formData.append('price', formVaules.price);
          formData.append('quantity', formVaules.quantity);
          formData.append('category', formVaules.category);
          formData.append('inventoryStatus', formVaules.inventoryStatus);
          formData.append('productDescription', formVaules.productDescription);
          for (let i = 0; i < this.files.length; i++) {
            formData.append('image', this.files[i]);
          }

          console.log('checkin POST body', formData);

          this.service
            .postData('addProduct', formData)
            .subscribe((response: any) => {
              console.log(response);

              if (response.data.status === '201') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Created',
                  life: 3000,
                });
                this.visible = false;
                this.getProducts();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'error',
                  detail: 'Something went wrong',
                  life: 3000,
                });
              }
            });
        }
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
          life: 3000,
        });
      }
    }
  };
  
  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
}
