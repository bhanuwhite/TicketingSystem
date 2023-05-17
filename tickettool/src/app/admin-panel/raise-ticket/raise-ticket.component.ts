import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent {
  ticketForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  
  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      company: ['', Validators.required],
      employee: ['', Validators.required],
      topic: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.ticketForm.valid) {
      // Form submission logic
      console.log(this.ticketForm)
    } else {
      // Handle form validation errors
    }
  }
  
  formVisibility = {
    isClientFormVisible: true,
    isInternalFormVisible: false,
    showClient: true
  };

  toggleForm(showClientForm: boolean) {
    this.formVisibility.isClientFormVisible = showClientForm;
    this.formVisibility.isInternalFormVisible = !showClientForm;
    this.formVisibility.showClient = showClientForm;
  }
}
