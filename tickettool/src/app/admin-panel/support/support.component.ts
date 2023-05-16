import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  cities: any = [
    { name: 'New York' },
    { name: 'New York' },
    { name: 'New York' },
  ];
  isShowsearch: any = true;
  isShowNewMessage: any;
  isShowResolved: any;
  constructor(private router: Router) {}

  onToggle(event: Event, id: any): void {
    this.isShowsearch = false;
    this.isShowNewMessage = false;
    this.isShowResolved = false;
    if (id == '1') {
      this.isShowsearch = true;
    } else if (id == '2' || id == '4') {
      this.isShowNewMessage = true;
    } else if (id == '3') {
      this.isShowResolved = true;
    }
  }
}
