import { Moment } from 'moment';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';

export interface IDiagnosis {
  id?: number;
  symptoms?: string;
  date?: Moment;
  service?: IConsultationResource;
}

export class Diagnosis implements IDiagnosis {
  constructor(public id?: number, public symptoms?: string, public date?: Moment, public service?: IConsultationResource) {}
}
