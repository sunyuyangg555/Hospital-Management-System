import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicine, Medicine } from 'app/shared/model/medicine.model';
import { MedicineService } from './medicine.service';
import { IMedicineGroup } from 'app/shared/model/medicine-group.model';
import { MedicineGroupService } from 'app/entities/medicine-group/medicine-group.service';
import { IMedicineCategory } from 'app/shared/model/medicine-category.model';
import { MedicineCategoryService } from 'app/entities/medicine-category/medicine-category.service';

type SelectableEntity = IMedicineGroup | IMedicineCategory;

@Component({
  selector: 'jhi-medicine-update',
  templateUrl: './medicine-update.component.html',
})
export class MedicineUpdateComponent implements OnInit {
  isSaving = false;
  medicinegroups: IMedicineGroup[] = [];
  medicinecategories: IMedicineCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    company: [null, [Validators.required]],
    compositions: [null, [Validators.required]],
    units: [],
    price: [],
    group: [],
    category: [],
  });

  constructor(
    protected medicineService: MedicineService,
    protected medicineGroupService: MedicineGroupService,
    protected medicineCategoryService: MedicineCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicine }) => {
      this.updateForm(medicine);

      this.medicineGroupService.query().subscribe((res: HttpResponse<IMedicineGroup[]>) => (this.medicinegroups = res.body || []));

      this.medicineCategoryService
        .query()
        .subscribe((res: HttpResponse<IMedicineCategory[]>) => (this.medicinecategories = res.body || []));
    });
  }

  updateForm(medicine: IMedicine): void {
    this.editForm.patchValue({
      id: medicine.id,
      name: medicine.name,
      company: medicine.company,
      compositions: medicine.compositions,
      units: medicine.units,
      price: medicine.price,
      group: medicine.group,
      category: medicine.category,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicine = this.createFromForm();
    if (medicine.id !== undefined) {
      this.subscribeToSaveResponse(this.medicineService.update(medicine));
    } else {
      this.subscribeToSaveResponse(this.medicineService.create(medicine));
    }
  }

  private createFromForm(): IMedicine {
    return {
      ...new Medicine(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      company: this.editForm.get(['company'])!.value,
      compositions: this.editForm.get(['compositions'])!.value,
      units: this.editForm.get(['units'])!.value,
      price: this.editForm.get(['price'])!.value,
      group: this.editForm.get(['group'])!.value,
      category: this.editForm.get(['category'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicine>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
