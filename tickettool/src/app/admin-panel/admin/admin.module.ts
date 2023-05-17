import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from '../support/support.component';
    import { DropdownModule } from 'primeng/dropdown';
    import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';

    import { TagModule } from 'primeng/tag';
    import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    SupportComponent,
    RaiseTicketComponent
  ],
  imports: [CommonModule,
    DropdownModule,
  TagModule ,
  PaginatorModule,
  ReactiveFormsModule,

  ]
})
export class AdminModule { }
