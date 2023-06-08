import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { productconst } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddCategoryComponent {
  productDialog!: boolean;

  products: any;

  product: any;

  selectedProducts: any;

  submitted!: boolean;

  statuses!: any[];
  productConst: any = productconst;
  categoryForm!: FormGroup;
  editsave!: string;
  editId: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private service: DataFetchService
  ) {}
  ngOnInit() {
    this.categoryInit();
    // this.products = this.productConst;
    this.getCategory();
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  categoryInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
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

  editProduct(product: any, name: string) {
    this.editId = product.id;
    this.editsave = name;
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.service
            .getData('deleteCategory/' + product.id)
            .subscribe((res) => {
              if (res.data.status === '200') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Deleted',
                  life: 3000,
                });
                this.getCategory();
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
    this.productDialog = false;
    this.submitted = false;
  }
  getCategory(): void {
    try {
      this.service.getData('listCategory').subscribe((data) => {
        this.products = data.categoryList;
      });
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
  saveProduct(): void {
    this.submitted = true;
    try {
      if (this.editsave === 'edit') {
        const data = {
          name: this.categoryForm.value.name,
        };
        this.service
          .putData('listCategory/' + this.editId, data)
          .subscribe((res) => {
            if (res.data.status === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category Updated',
                life: 3000,
              });
              this.productDialog = false;
              this.getCategory();
            }
          });
      } else {
        const data = {
          name: this.categoryForm.value.name,
        };
        this.service.postData('addCategory', data).subscribe((res) => {
          if (res.data.status === '200') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category Created',
              life: 3000,
            });
            this.productDialog = false;
            this.getCategory();
          }
        });
      }
    } catch (error) {
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
          life: 3000,
        });
        this.productDialog = false;
      }
    }

    // if (this.product.name?.trim()) {
    //   if (this.product.id) {
    //     this.products[this.findIndexById(this.product.id)] = this.product;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Category Updated',
    //       life: 3000,
    //     });
    //   } else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Category Created',
    //       life: 3000,
    //     });
    //   }

    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

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
