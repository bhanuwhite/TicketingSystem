export interface User {
    _id: string;
    type: string;
    company: string;
    employee: string;
    topic: string;
    title: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    employeeNames?:any
    assignee?:string;
  };

  export interface modalData {
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
  } 
  