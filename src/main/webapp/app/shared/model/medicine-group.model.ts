import { IMedicine } from 'app/shared/model/medicine.model';

export interface IMedicineGroup {
  id?: number;
  name?: string;
  descriptions?: string;
  medicines?: IMedicine[];
}

export class MedicineGroup implements IMedicineGroup {
  constructor(public id?: number, public name?: string, public descriptions?: string, public medicines?: IMedicine[]) {}
}
