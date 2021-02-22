import { Moment } from 'moment';
import { IAdmission } from 'app/shared/model/admission.model';

export interface IAdmissionVisit {
  id?: number;
  symptoms?: string;
  dateTime?: Moment;
  admission?: IAdmission;
}

export class AdmissionVisit implements IAdmissionVisit {
  constructor(public id?: number, public symptoms?: string, public dateTime?: Moment, public admission?: IAdmission) {}
}
