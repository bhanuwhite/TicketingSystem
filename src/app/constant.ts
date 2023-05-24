export enum filterButtons {
  unassigned = '1',
  allTickets = '2',
  resolved = '3',
  internal = '4',
}

export const fliters: any = [
  { name: 'Fliters 1' },
  { name: 'Fliters 2' },
  { name: 'Fliters 3' },
];
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
}
