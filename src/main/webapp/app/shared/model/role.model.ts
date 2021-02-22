import { IAuthority } from 'app/shared/model/authority.model';
import { IPrivilege } from 'app/shared/model/privilege.model';

export interface IRole {
  id?: number;
  name?: string;
  authority?: IAuthority;
  privileges?: IPrivilege[];
}

export class Role implements IRole {
  constructor(public id?: number, public name?: string, public authority?: IAuthority, public privileges?: IPrivilege[]) {}
}
