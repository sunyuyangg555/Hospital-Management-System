import { ITransactions } from 'app/shared/model/transactions.model';

export interface IMedicalService {
  id?: number;
  name?: string;
  isActive?: boolean;
  price?: number;
  transcations?: ITransactions[];
}

export class MedicalService implements IMedicalService {
  constructor(
    public id?: number,
    public name?: string,
    public isActive?: boolean,
    public price?: number,
    public transcations?: ITransactions[]
  ) {
    this.isActive = this.isActive || false;
  }
}
