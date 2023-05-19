import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, filterButtons } from '../../constant';
import { fliters } from '../../constant';
import { DataFetchService } from 'src/app/data-fetch.service';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  currentPage = 1;
  fliters = fliters;
  isShow: {
    search: boolean;
    newMessage: boolean;
    resolved: boolean;
  } = {
    search: true,
    newMessage: false,
    resolved: false,
  };

  fliteredData: User[]=[];

  constructor(private router: Router, private service: DataFetchService) {
    this.fetchData();
  }
  fetchData(): void {
    this.service.getData().subscribe((data) => {
      this.fliteredData = data;
      console.log(this.fliteredData);

    });
  }
  onToggle(event: Event, id: any): void {
    if (id == filterButtons.unassigned) {
      this.isShow.search = true;
      this.isShow.newMessage = false;
      this.isShow.resolved = false;
    } else if (id == filterButtons.allTickets || id == filterButtons.internal) {
      this.isShow.newMessage = true;
      this.isShow.search = false;
      this.isShow.resolved = false;
    } else if (id == filterButtons.resolved) {
      this.isShow.resolved = true;
      this.isShow.newMessage = false;
      this.isShow.search = false;
    }
  }
  openModal(){
    console.log("open")
  }
}
