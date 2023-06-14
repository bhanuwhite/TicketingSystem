import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataFetchService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css'],
})
export class RaiseTicketComponent {
  clientForm!: FormGroup;
  internalForm!: FormGroup;
  formVisibility = {
    isClientFormVisible: true,
    isInternalFormVisible: false,
    showClient: true,
  };
  selectedForm: string = 'client';
  companyList: any[] = [];
  employeesList: any[] = [];
  selectedCompany: any[] = [];
  topicList: any[] = [];
  file!: File;
  adminList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: DataFetchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getcompany();
    this.getTopic();
    this.getadmin();
    this.clientFormInt();
    this.internalFormInt();
  }

  clientFormInt(): void {
    this.clientForm = this.formBuilder.group({
      company: ['', Validators.required],
      employee: ['', Validators.required],
      topic: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  internalFormInt(): void {
    this.internalForm = this.formBuilder.group({
      admin: ['', Validators.required],
      topic: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  getcompany(): void {
    this.service.getData('companyNames').subscribe((data) => {
      this.companyList = data.Data;
    });
  }
  getTopic(): void {
    this.service.getData('topic').subscribe((data) => {
      this.topicList = data.list;
    });
  }
  onCompanyChange(event: any): void {
    this.selectedCompany = event.target.value;
    this.getemployees();
  }

  getemployees(): void {
    this.service.getData('users/' + this.selectedCompany).subscribe((data) => {
      this.employeesList = data.company;
    });
  }
  getadmin(): void {
    this.service.getData('admin').subscribe((data) => {
      this.adminList = data.data;
    });
  }
  submitForm(): void {
    if (this.selectedForm === 'client') {
      if (this.clientForm.invalid) {
        return;
      } else {
        const formVaules = this.clientForm.value;
        const formData = new FormData();
        formData.append('type', 'client'),
          formData.append('company', formVaules.company);
        formData.append('employee', formVaules.employee);
        formData.append('topic', formVaules.topic);
        formData.append('title', formVaules.title);
        formData.append('message', formVaules.message);
        formData.append('image', this.file);
        this.service.postData('users', formData).subscribe((response) => {
          if (response.data.statusCode === '201') {
            this.router.navigate(['/support']);
          } else {
            alert('Something went wrong');
          }
        });
      }
    } else if (this.selectedForm === 'internal') {
      if (this.internalForm.invalid) {
        return;
      } else {
        const formVaules = this.internalForm.value;
        const formData = new FormData();
        formData.append('type', 'internal'),
          formData.append('admin', formVaules.admin),
          formData.append('topic', formVaules.topic);
        formData.append('title', formVaules.title);
        formData.append('message', formVaules.message);
        formData.append('image', this.file);
        this.service.postData('users', formData).subscribe((response) => {
          if (response.data.statusCode === '201') {
            this.router.navigate(['/admin-dashboard/support']);
          } else {
            alert('Something went wrong');
          }
        });
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files;
    this.file = file[0];
  }
  toggleForm(showClientForm: boolean, id: string): void {
    this.selectedForm = id;
    this.formVisibility.isClientFormVisible = showClientForm;
    this.formVisibility.isInternalFormVisible = !showClientForm;
    this.formVisibility.showClient = showClientForm;
  }
}
