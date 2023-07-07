import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminModule } from './components/admin-panel/admin/admin.module';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInterceptor } from './shared/my-http-Interceptor';
import { AllProductsComponent } from './components/all-products/all-products.component';

import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { TaxPageComponent } from './components/tax-page/tax-page.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InVoiceComponent } from './components/in-voice/in-voice.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CustomerComponent } from './components/customer/customer.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { SidebarModule } from 'primeng/sidebar';



@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent, FooterComponent, AdminDashboardComponent, LoginComponent, AllProductsComponent, PageNotFoundComponent, AddCategoryComponent, TaxPageComponent, PlaceOrderComponent, InVoiceComponent, DashboardComponent, CustomerComponent, InvoiceDetailsComponent],
  imports: [
    SidebarModule,
CommonModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    TreeTableModule,
    InputTextModule,
    CheckboxModule,
    TriStateCheckboxModule,
    RatingModule,
    TagModule,
    DynamicDialogModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    KeyFilterModule,
    AutoCompleteModule,
    
    CalendarModule,
    MultiSelectModule,
    DatePipe,NgCircleProgressModule
   

    .forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
