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
    companyName: boolean;
    type: boolean;
  } = {
    search: true,
    newMessage: false,
    resolved: false,
    companyName: false,
    type: false,
  };

  fliteredData: User[] = [];
  data: {
    unassign: User[];
    resloved: User[];
    allTicket: User[];
    internal: User[];
  } = {
    unassign: [],
    resloved: [],
    allTicket: [],
    internal: [],
  };

  modalview: any;
  modalData: {
    _id: string;
    title: string;
    message: string;
    status: string;
    view_count: string;
    label: string;
    priority: string;
    assignee: string;
    reporter: string;
    sprint: string;
    Fix_version: string;
    original_estimate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }={
    "_id": "",
    "title": "",
    "message": "",
    "status": "",
    "view_count": "",
    "label": "",
    "priority": "",
    "assignee": "",
    "reporter": "",
    "sprint": "",
    "Fix_version": "",
    "original_estimate": "",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0
  } ;

  constructor(private router: Router, private service: DataFetchService) {
    this.fetchData();
  }
  fetchData(): void {
    this.service.getData('users').subscribe((data) => {
      console.log(data);
      this.fliteredData = data;
      this.data.allTicket = data;
      this.fliteredData.map((res) => {
        if (res.status == 'unassigned') {
          this.data.unassign.push(res);
        }
      });
      this.fliteredData.map((res) => {
        if (res.type == 'internal') {
          this.data.internal.push(res);
        }
      });
      this.fliteredData.map((res) => {
        if (res.status == 'assigned') {
          this.data.resloved.push(res);
        }
      });
    });
  }
  onToggle(event: Event, id: any): void {
    if (id == filterButtons.unassigned) {
      this.isShow.search = true;
      this.isShow.newMessage = false;
      this.isShow.resolved = false;
      this.isShow.companyName = true;
      this.isShow.type = false;
      this.fliteredData = this.data.unassign;
      this.currentPage = 1;
      console.log(this.fliteredData);
    } else if (id == filterButtons.allTickets) {
      this.isShow.newMessage = true;
      this.isShow.search = false;
      this.isShow.resolved = false;
      this.isShow.companyName = false;
      this.isShow.type = false;
      this.fliteredData = this.data.allTicket;
      this.currentPage = 1;
    } else if (id == filterButtons.resolved) {
      this.isShow.resolved = true;
      this.isShow.newMessage = false;
      this.isShow.search = false;
      this.isShow.companyName = false;
      this.isShow.type = true;
      this.fliteredData = this.data.resloved;
      this.currentPage = 1;
    } else if (id == filterButtons.internal) {
      this.isShow.newMessage = true;
      this.isShow.search = false;
      this.isShow.resolved = false;
      this.isShow.companyName = false;
      this.fliteredData = this.data.internal;
      this.currentPage = 1;
      this.isShow.type = false;
    }
  }
  openModal() {
    console.log('open');
  }
  get_id(id: any) {
    this.service.getData('user/' + id).subscribe((data) => {
      this.modalData = data.popUpList[0];
      console.log(this.modalData);
    });
  }

  getModalData() {}
}
