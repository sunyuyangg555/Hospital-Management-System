import { Moment } from 'moment';
import { IMedicalService } from 'app/shared/model/medical-service.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { IMedicine } from 'app/shared/model/medicine.model';

export interface ITransactions {
  id?: number;
  currencyCode?: string;
  amount?: number;
  isReversed?: boolean;
  transactionDate?: Moment;
  medicalService?: IMedicalService;
  department?: IDepartment;
  consultation?: IConsultationResource;
  medicine?: IMedicine;
}

export class Transactions implements ITransactions {
  constructor(
    public id?: number,
    public currencyCode?: string,
    public amount?: number,
    public isReversed?: boolean,
    public transactionDate?: Moment,
    public medicalService?: IMedicalService,
    public department?: IDepartment,
    public consultation?: IConsultationResource,
    public medicine?: IMedicine
  ) {
    this.isReversed = this.isReversed || false;
  }
}
