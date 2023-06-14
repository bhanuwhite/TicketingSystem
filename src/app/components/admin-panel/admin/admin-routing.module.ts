import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
const routes: Routes = [
  // {path:'raise-ticket', component:RaiseTicketComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
