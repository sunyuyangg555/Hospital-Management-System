import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicalService, MedicalService } from 'app/shared/model/medical-service.model';
import { MedicalServiceService } from './medical-service.service';

@Component({
  selector: 'jhi-medical-service-update',
  templateUrl: './medical-service-update.component.html',
})
export class MedicalServiceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, []],
    isActive: [null, [Validators.required]],
    price: [null, [Validators.required]],
  });

  constructor(protected medicalServiceService: MedicalServiceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicalService }) => {
      this.updateForm(medicalService);
    });
  }

  updateForm(medicalService: IMedicalService): void {
    this.editForm.patchValue({
      id: medicalService.id,
      name: medicalService.name,
      isActive: medicalService.isActive,
      price: medicalService.price,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicalService = this.createFromForm();
    if (medicalService.id !== undefined) {
      this.subscribeToSaveResponse(this.medicalServiceService.update(medicalService));
    } else {
      this.subscribeToSaveResponse(this.medicalServiceService.create(medicalService));
    }
  }

  private createFromForm(): IMedicalService {
    return {
      ...new MedicalService(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicalService>>): void {
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
