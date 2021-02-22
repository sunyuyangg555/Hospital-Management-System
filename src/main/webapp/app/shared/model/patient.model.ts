import { IConsultationResource } from 'app/shared/model/consultation-resource.model';

export interface IPatient {
  id?: number;
  name?: string;
  guardianName?: string;
  phone?: string;
  address?: string;
  emailAddress?: string;
  height?: string;
  weight?: string;
  bloodPressure?: string;
  age?: number;
  isAdmitted?: boolean;
  patientPhoto?: string;
  bloodGroup?: string;
  note?: string;
  symptoms?: string;
  marriageStatus?: string;
  gender?: string;
  isActive?: boolean;
  contactsInformation?: IConsultationResource;
  consulatationResources?: IConsultationResource[];
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public name?: string,
    public guardianName?: string,
    public phone?: string,
    public address?: string,
    public emailAddress?: string,
    public height?: string,
    public weight?: string,
    public bloodPressure?: string,
    public age?: number,
    public isAdmitted?: boolean,
    public patientPhoto?: string,
    public bloodGroup?: string,
    public note?: string,
    public symptoms?: string,
    public marriageStatus?: string,
    public gender?: string,
    public isActive?: boolean,
    public contactsInformation?: IConsultationResource,
    public consulatationResources?: IConsultationResource[]
  ) {
    this.isAdmitted = this.isAdmitted || false;
    this.isActive = this.isActive || false;
  }
}
