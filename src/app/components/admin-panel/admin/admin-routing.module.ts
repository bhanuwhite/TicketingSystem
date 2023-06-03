import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from '../support/support.component';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
const routes: Routes = [
  { path: 'support', component: SupportComponent ,canActivate: [AuthGuard]},
  { path: 'raise-ticket', component: RaiseTicketComponent,canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
