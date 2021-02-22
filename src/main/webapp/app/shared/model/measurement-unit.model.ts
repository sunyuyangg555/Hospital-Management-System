import { IMedicineCategory } from 'app/shared/model/medicine-category.model';

export interface IMeasurementUnit {
  id?: number;
  unit?: string;
  symbol?: string;
  quantity?: string;
  medicineCategories?: IMedicineCategory[];
}

export class MeasurementUnit implements IMeasurementUnit {
  constructor(
    public id?: number,
    public unit?: string,
    public symbol?: string,
    public quantity?: string,
    public medicineCategories?: IMedicineCategory[]
  ) {}
}
