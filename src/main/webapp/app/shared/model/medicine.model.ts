import { ITransactions } from 'app/shared/model/transactions.model';
import { IMedicineGroup } from 'app/shared/model/medicine-group.model';
import { IMedicineCategory } from 'app/shared/model/medicine-category.model';

export interface IMedicine {
  id?: number;
  name?: string;
  company?: string;
  compositions?: string;
  units?: number;
  price?: number;
  transactions?: ITransactions[];
  group?: IMedicineGroup;
  category?: IMedicineCategory;
}

export class Medicine implements IMedicine {
  constructor(
    public id?: number,
    public name?: string,
    public company?: string,
    public compositions?: string,
    public units?: number,
    public price?: number,
    public transactions?: ITransactions[],
    public group?: IMedicineGroup,
    public category?: IMedicineCategory
  ) {}
}
