import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from '../support/support.component';
import { DropdownModule } from 'primeng/dropdown';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';

import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SupportComponent, RaiseTicketComponent],
  imports: [
    CommonModule,
    DropdownModule,
    TagModule,
    PaginatorModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxPaginationModule

  ],
})
export class AdminModule {}
