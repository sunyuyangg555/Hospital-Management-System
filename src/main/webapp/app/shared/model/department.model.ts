import { Moment } from 'moment';
import { IStaff } from 'app/shared/model/staff.model';
import { ITransactions } from 'app/shared/model/transactions.model';

export interface IDepartment {
  id?: number;
  name?: string;
  hierarchy?: string;
  descriptions?: string;
  openingDate?: Moment;
  extraId?: string;
  children?: IDepartment[];
  staffs?: IStaff[];
  transactions?: ITransactions[];
  parent?: IDepartment;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: string,
    public hierarchy?: string,
    public descriptions?: string,
    public openingDate?: Moment,
    public extraId?: string,
    public children?: IDepartment[],
    public staffs?: IStaff[],
    public transactions?: ITransactions[],
    public parent?: IDepartment
  ) {}
}
