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
  name: string;
  Title: string;
  Description: string;
  Topic: string;
  AssignTo: string;
}