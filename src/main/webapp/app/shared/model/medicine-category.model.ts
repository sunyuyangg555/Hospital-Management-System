import { IMedicine } from 'app/shared/model/medicine.model';
import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';

export interface IMedicineCategory {
  id?: number;
  name?: string;
  descriptions?: string;
  medicines?: IMedicine[];
  measurementUnit?: IMeasurementUnit;
}

export class MedicineCategory implements IMedicineCategory {
  constructor(
    public id?: number,
    public name?: string,
    public descriptions?: string,
    public medicines?: IMedicine[],
    public measurementUnit?: IMeasurementUnit
  ) {}
}
