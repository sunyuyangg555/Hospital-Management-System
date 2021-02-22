import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicineCategory, MedicineCategory } from 'app/shared/model/medicine-category.model';
import { MedicineCategoryService } from './medicine-category.service';
import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';
import { MeasurementUnitService } from 'app/entities/measurement-unit/measurement-unit.service';

@Component({
  selector: 'jhi-medicine-category-update',
  templateUrl: './medicine-category-update.component.html',
})
export class MedicineCategoryUpdateComponent implements OnInit {
  isSaving = false;
  measurementunits: IMeasurementUnit[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]],
    descriptions: [null, [Validators.maxLength(350)]],
    measurementUnit: [],
  });

  constructor(
    protected medicineCategoryService: MedicineCategoryService,
    protected measurementUnitService: MeasurementUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicineCategory }) => {
      this.updateForm(medicineCategory);

      this.measurementUnitService.query().subscribe((res: HttpResponse<IMeasurementUnit[]>) => (this.measurementunits = res.body || []));
    });
  }

  updateForm(medicineCategory: IMedicineCategory): void {
    this.editForm.patchValue({
      id: medicineCategory.id,
      name: medicineCategory.name,
      descriptions: medicineCategory.descriptions,
      measurementUnit: medicineCategory.measurementUnit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicineCategory = this.createFromForm();
    if (medicineCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.medicineCategoryService.update(medicineCategory));
    } else {
      this.subscribeToSaveResponse(this.medicineCategoryService.create(medicineCategory));
    }
  }

  private createFromForm(): IMedicineCategory {
    return {
      ...new MedicineCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      descriptions: this.editForm.get(['descriptions'])!.value,
      measurementUnit: this.editForm.get(['measurementUnit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicineCategory>>): void {
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

  trackById(index: number, item: IMeasurementUnit): any {
    return item.id;
  }
}
