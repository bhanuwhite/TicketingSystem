export const fliters: { name: string }[] = [
  { name: 'Fliters 1' },
  { name: 'Fliters 2' },
  { name: 'Fliters 3' },
];

export const baseUrl = 'http://192.168.0.103:3000/api/';
export const selectedButtons: {
  selectAll: boolean;
  selectunassigned: boolean;
  selectResolved: boolean;
  selectInternal: boolean;
} = {
  selectAll: false,
  selectunassigned: false,
  selectResolved: false,
  selectInternal: false,
};