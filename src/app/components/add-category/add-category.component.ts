import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataFetchService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AddCategoryComponent {
  productDialog!: boolean;

  products: any[]=[];

  product: any;

  selectedProducts: any;

  submitted!: boolean;

  statuses!: any[];
  categoryForm!: FormGroup;
  editsave!: string;
  editId: any;
  multiSelectedDelete: any[]=[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private service: DataFetchService
  ) {}
  ngOnInit() {
    console.log(this.products);

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
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    });
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  multiSelected(category:any){
    this.multiSelectedDelete.push(category._id);
    console.log(this.multiSelectedDelete);

  }
  deleteSelectedProducts(product:any) {
    console.log(product)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          // const delete_id :any=[]
          // delete_id.push(product._id)
          const data = {
            itemIds:this.multiSelectedDelete
          }
          this.service
            .patchData('deleteCategory' , data)
            .subscribe((res) => {
              if (res.data.status === '200') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Category Deleted',
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
          const delete_id :any=[]
          delete_id.push(product._id)
          const data = {
            itemIds:delete_id
          }
          this.service
            .patchData('deleteCategory' , data)
            .subscribe((res) => {
              if (res.data.status === '200') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Category Deleted',
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
        console.log(this.products);
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
        // this.service.postData('addCategory', data).subscribe((res) => {
        //   if (res.data.status === '200') {
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Successful',
        //       detail: 'Category Created',
        //       life: 3000,
        //     });
        //     this.productDialog = false;
        //     this.getCategory();
        //   }
        // });
        this.service.postData('addCategory', data).subscribe({
          next: (res: any) => {
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
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Category already exists',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Something went wrong',
                life: 3000,
              });
            }
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
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
