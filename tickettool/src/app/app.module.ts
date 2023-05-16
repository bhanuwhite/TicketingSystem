import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupportComponent } from './admin-panel/support/support.component';
import { RaiseTicketComponent } from './admin-panel/raise-ticket/raise-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    SupportComponent,
    RaiseTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
