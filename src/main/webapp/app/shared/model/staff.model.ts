import { IUser } from 'app/core/user/user.model';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IStaff {
  id?: number;
  username?: string;
  fullName?: string;
  contacts?: string;
  imageUrl?: string;
  level?: string;
  email?: string;
  isActive?: boolean;
  isAcailable?: boolean;
  user?: IUser;
  services?: IConsultationResource[];
  department?: IDepartment;
}

export class Staff implements IStaff {
  constructor(
    public id?: number,
    public username?: string,
    public fullName?: string,
    public contacts?: string,
    public imageUrl?: string,
    public level?: string,
    public email?: string,
    public isActive?: boolean,
    public isAcailable?: boolean,
    public user?: IUser,
    public services?: IConsultationResource[],
    public department?: IDepartment
  ) {
    this.isActive = this.isActive || false;
    this.isAcailable = this.isAcailable || false;
  }
}
