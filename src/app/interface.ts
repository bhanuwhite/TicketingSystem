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
  