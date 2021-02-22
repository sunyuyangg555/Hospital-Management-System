import { Moment } from 'moment';
import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { IAdmission } from 'app/shared/model/admission.model';
import { ITransactions } from 'app/shared/model/transactions.model';
import { IStaff } from 'app/shared/model/staff.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IConsultationResource {
  id?: number;
  fromdate?: Moment;
  todate?: Moment;
  isActive?: boolean;
  isAdmitted?: boolean;
  diagnoses?: IDiagnosis[];
  admissions?: IAdmission[];
  transactions?: ITransactions[];
  staff?: IStaff;
  patient?: IPatient;
}

export class ConsultationResource implements IConsultationResource {
  constructor(
    public id?: number,
    public fromdate?: Moment,
    public todate?: Moment,
    public isActive?: boolean,
    public isAdmitted?: boolean,
    public diagnoses?: IDiagnosis[],
    public admissions?: IAdmission[],
    public transactions?: ITransactions[],
    public staff?: IStaff,
    public patient?: IPatient
  ) {
    this.isActive = this.isActive || false;
    this.isAdmitted = this.isAdmitted || false;
  }
}
