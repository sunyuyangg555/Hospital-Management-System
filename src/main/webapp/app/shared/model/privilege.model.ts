import { IRole } from 'app/shared/model/role.model';

export interface IPrivilege {
  id?: number;
  name?: string;
  roles?: IRole[];
}

export class Privilege implements IPrivilege {
  constructor(public id?: number, public name?: string, public roles?: IRole[]) {}
}
