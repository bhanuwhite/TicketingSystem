import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataFetchService } from 'src/app/services/common.service';
import { User } from 'src/app/interface';
import { filterButtons } from 'src/app/enum';
import { fliters, selectedButtons } from 'src/app/constant';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  currentPage = 1;
  fliters = fliters;
  searchedValue = '';
  isShow: {
    search: boolean;
    newMessage: boolean;
    resolved: boolean;
    companyName: boolean;
    type: boolean;
  } = {
    search: false,
    newMessage: false,
    resolved: false,
    companyName: false,
    type: false,
  };
  selected: boolean = false;
  fliteredData: User[] = [];
  selectedButtons = selectedButtons;
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
    ticketId: string;
    __v: number;
  } = {
    _id: '',
    title: '',
    message: '',
    status: '',
    view_count: '',
    label: '',
    priority: '',
    assignee: '',
    reporter: '',
    sprint: '',
    Fix_version: '',
    original_estimate: '',
    createdAt: '',
    updatedAt: '',
    ticketId: '',
    __v: 0,
  };
  employeesList: any;
  getCompany!: string;
  selectedCompany!: any;

  constructor(private router: Router, private service: DataFetchService) {
    this.fetchData();
  }
  fetchData(): void {
    this.service.getData('users').subscribe((data) => {
      this.fliteredData = data;
      this.data.allTicket = data;
      this.data.unassign = this.fliteredData.filter(
        (e) => e.status === 'unassigned'
      );
      this.data.internal = this.fliteredData.filter(
        (e) => e.type === 'internal'
      );
      this.data.resloved = this.fliteredData.filter(
        (e) => e.status === 'assigned'
      );
    });
  }
  onToggle(event: Event, id: string): void {
    if (id == filterButtons.unassigned) {
      this.isShow.search = true;
      this.isShow.newMessage = false;
      this.isShow.resolved = false;
      this.isShow.companyName = true;
      this.isShow.type = false;
      this.fliteredData = this.data.unassign;
      this.selectedButtons.selectAll = false;
      this.selectedButtons.selectunassigned = true;
      this.selectedButtons.selectResolved = false;
      this.selectedButtons.selectInternal = false;
      this.currentPage = 1;
      this.searchedValue='';
      this.getCompanyName(this.fliteredData);
    } else if (id == filterButtons.allTickets) {
      this.isShow.newMessage = true;
      this.isShow.search = false;
      this.isShow.resolved = false;
      this.isShow.companyName = false;
      this.isShow.type = false;
      this.selectedButtons.selectAll = true;
      this.selectedButtons.selectunassigned = false;
      this.selectedButtons.selectResolved = false;
      this.selectedButtons.selectInternal = false;
      this.fliteredData = this.data.allTicket;
      this.currentPage = 1;
      this.searchedValue='';
    } else if (id == filterButtons.resolved) {
      this.isShow.resolved = true;
      this.isShow.newMessage = false;
      this.isShow.search = false;
      this.isShow.companyName = false;
      this.selectedButtons.selectAll = false;
      this.selectedButtons.selectunassigned = false;
      this.selectedButtons.selectResolved = true;
      this.selectedButtons.selectInternal = false;
      this.isShow.type = true;
      this.fliteredData = this.data.resloved;
      this.currentPage = 1;
      this.searchedValue='';
    } else if (id == filterButtons.internal) {
      this.isShow.newMessage = true;
      this.isShow.search = false;
      this.isShow.resolved = false;
      this.isShow.companyName = false;
      this.selectedButtons.selectAll = false;
      this.selectedButtons.selectunassigned = false;
      this.selectedButtons.selectResolved = false;
      this.selectedButtons.selectInternal = true;
      this.fliteredData = this.data.internal;
      this.currentPage = 1;
      this.searchedValue='';
      this.isShow.type = false;
    }
  }
  get_id(id: string): void {
    this.service.getData('user/' + id).subscribe((data) => {
      this.modalData = data.popUpList[0];
    });
  }

  onAssign(event: any, companyName: string) {
    this.selectedCompany = companyName;
  }
  getCompanyName(filter: any) {
    this.service.getData('companyNames').subscribe((data) => {
      this.employeesList = data.Data;
      filter.forEach((e: any) => {
        this.employeesList.forEach((j: any) => {
          if (e.company == j.company) {
            e['employeeNames'] = j.employeeNames;
          }
        });
      });
      this.fliteredData = filter;
    });
  }

  search(fliteredData: any): void {
    const data = {
      title: this.searchedValue,
    };
    this.service.postData('search', data).subscribe((res) => {
      this.fliteredData = res.data;
    });
  }
  assigneeChange(event: any, id: string): void {
    const assigneValue = event.target.value;
    const body = {
      assignee: assigneValue,
    };
    this.service.putData('user/' + id, body).subscribe((res) => {
    });
  }
}
