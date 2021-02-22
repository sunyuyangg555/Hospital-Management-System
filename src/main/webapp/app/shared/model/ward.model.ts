import { IBed } from 'app/shared/model/bed.model';

export interface IWard {
  id?: number;
  name?: string;
  beds?: IBed[];
}

export class Ward implements IWard {
  constructor(public id?: number, public name?: string, public beds?: IBed[]) {}
}
