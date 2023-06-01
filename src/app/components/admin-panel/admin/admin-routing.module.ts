import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from '../support/support.component';
import { RaiseTicketComponent } from '../raise-ticket/raise-ticket.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'raise-ticket', component: RaiseTicketComponent },
  {path:'footer',component:FooterComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'header',component:HeaderComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
