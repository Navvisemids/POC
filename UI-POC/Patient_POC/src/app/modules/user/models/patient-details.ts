export class PatientDetails {
  id!: number;
  name!: string;
  dateOfBirth!: Date | string;
  address!: string;
  phone!: string;
  email!: string;
}

export enum Mode {
  add = 'Add',
  edit = 'Edit',
}
