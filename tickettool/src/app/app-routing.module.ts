import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './admin-panel/support/support.component';
import { RaiseTicketComponent } from './admin-panel/raise-ticket/raise-ticket.component';

const routes: Routes = [

  {path:'support', component:SupportComponent},
  {path:'raise-ticket', component:RaiseTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
