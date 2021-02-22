import { Moment } from 'moment';
import { IAdmissionVisit } from 'app/shared/model/admission-visit.model';
import { IBed } from 'app/shared/model/bed.model';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';

export interface IAdmission {
  id?: number;
  isActive?: boolean;
  fromDateTime?: Moment;
  toDateTime?: Moment;
  visits?: IAdmissionVisit[];
  beds?: IBed[];
  service?: IConsultationResource;
}

export class Admission implements IAdmission {
  constructor(
    public id?: number,
    public isActive?: boolean,
    public fromDateTime?: Moment,
    public toDateTime?: Moment,
    public visits?: IAdmissionVisit[],
    public beds?: IBed[],
    public service?: IConsultationResource
  ) {
    this.isActive = this.isActive || false;
  }
}
