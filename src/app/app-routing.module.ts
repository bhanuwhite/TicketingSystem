import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './common/guard/auth.guard';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SupportComponent } from './components/admin-panel/support/support.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RaiseTicketComponent } from './components/admin-panel/raise-ticket/raise-ticket.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { TaxPageComponent } from './components/tax-page/tax-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: PlaceOrderComponent },
 
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'allproducts',
        component: AllProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'support',
        component: SupportComponent,
        canActivate: [AuthGuard],
        
      },
      {
        path: 'addcategory',
        component: AddCategoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'support/raise-ticket',
        component: RaiseTicketComponent,
        canActivate: [AuthGuard],
      },
       { path:'tax-page',component:TaxPageComponent
      }
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
