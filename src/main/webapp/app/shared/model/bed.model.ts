import { IWard } from 'app/shared/model/ward.model';
import { IAdmission } from 'app/shared/model/admission.model';

export interface IBed {
  id?: number;
  identifier?: string;
  isOccupied?: boolean;
  ward?: IWard;
  admissions?: IAdmission[];
}

export class Bed implements IBed {
  constructor(
    public id?: number,
    public identifier?: string,
    public isOccupied?: boolean,
    public ward?: IWard,
    public admissions?: IAdmission[]
  ) {
    this.isOccupied = this.isOccupied || false;
  }
}
