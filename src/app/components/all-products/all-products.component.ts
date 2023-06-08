import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { productconst } from 'src/app/shared/constant';
import { DataFetchService } from 'src/app/shared/services/common.service';

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
  statuses!: any[];
  productConst: any = productconst;
  addProductForm!: FormGroup;
  categoryList!: any[];
  categoryName: string = 'Select Category';
  initalStatus: string = 'Select Inventory Status';
  files: File[] = [];
  statusList: any;

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
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
  getcategory(): void {
    this.service.getData('listCategory').subscribe((res) => {
      this.categoryList = res.categoryList;
      console.log(res);
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
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
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
    // this.product = {};
    this.submitted = false;
    // this.productDialog = true;
    this.visible = true;
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

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val: any) => val.id !== product.id
        );
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
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
  // if (this.product.name.trim()) {

  //   if (this.product.id) {
  //     this.products[this.findIndexById(this.product.id)] = this.product;
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Updated',
  //       life: 3000,
  //     });
  //   } else {
  //     this.product.id = this.createId();
  //     this.product.image = 'product-placeholder.svg';
  //     this.products.push(this.product);
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Created',
  //       life: 3000,
  //     });
  //   }

  //   this.products = [...this.products];
  //   this.productDialog = false;
  //   this.product = {};
  // }

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

  submitAddProductForm() {}
}
