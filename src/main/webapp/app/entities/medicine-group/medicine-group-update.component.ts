import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicineGroup, MedicineGroup } from 'app/shared/model/medicine-group.model';
import { MedicineGroupService } from './medicine-group.service';

@Component({
  selector: 'jhi-medicine-group-update',
  templateUrl: './medicine-group-update.component.html',
})
export class MedicineGroupUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]],
    descriptions: [null, [Validators.required, Validators.maxLength(250)]],
  });

  constructor(protected medicineGroupService: MedicineGroupService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicineGroup }) => {
      this.updateForm(medicineGroup);
    });
  }

  updateForm(medicineGroup: IMedicineGroup): void {
    this.editForm.patchValue({
      id: medicineGroup.id,
      name: medicineGroup.name,
      descriptions: medicineGroup.descriptions,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicineGroup = this.createFromForm();
    if (medicineGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.medicineGroupService.update(medicineGroup));
    } else {
      this.subscribeToSaveResponse(this.medicineGroupService.create(medicineGroup));
    }
  }

  private createFromForm(): IMedicineGroup {
    return {
      ...new MedicineGroup(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      descriptions: this.editForm.get(['descriptions'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicineGroup>>): void {
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
