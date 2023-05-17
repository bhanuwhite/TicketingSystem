import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from '../support/support.component';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';
const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'raise-ticket', component: RaiseTicketComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
