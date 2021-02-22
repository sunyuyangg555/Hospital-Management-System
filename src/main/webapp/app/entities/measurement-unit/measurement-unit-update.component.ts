import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMeasurementUnit, MeasurementUnit } from 'app/shared/model/measurement-unit.model';
import { MeasurementUnitService } from './measurement-unit.service';

@Component({
  selector: 'jhi-measurement-unit-update',
  templateUrl: './measurement-unit-update.component.html',
})
export class MeasurementUnitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    unit: [null, [Validators.required, Validators.maxLength(100)]],
    symbol: [null, [Validators.required, Validators.maxLength(20)]],
    quantity: [null, [Validators.maxLength(80)]],
  });

  constructor(
    protected measurementUnitService: MeasurementUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ measurementUnit }) => {
      this.updateForm(measurementUnit);
    });
  }

  updateForm(measurementUnit: IMeasurementUnit): void {
    this.editForm.patchValue({
      id: measurementUnit.id,
      unit: measurementUnit.unit,
      symbol: measurementUnit.symbol,
      quantity: measurementUnit.quantity,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const measurementUnit = this.createFromForm();
    if (measurementUnit.id !== undefined) {
      this.subscribeToSaveResponse(this.measurementUnitService.update(measurementUnit));
    } else {
      this.subscribeToSaveResponse(this.measurementUnitService.create(measurementUnit));
    }
  }

  private createFromForm(): IMeasurementUnit {
    return {
      ...new MeasurementUnit(),
      id: this.editForm.get(['id'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      symbol: this.editForm.get(['symbol'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeasurementUnit>>): void {
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
}
