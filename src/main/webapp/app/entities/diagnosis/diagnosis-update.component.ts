import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiagnosis, Diagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';

@Component({
  selector: 'jhi-diagnosis-update',
  templateUrl: './diagnosis-update.component.html',
})
export class DiagnosisUpdateComponent implements OnInit {
  isSaving = false;
  consultationresources: IConsultationResource[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    symptoms: [null, [Validators.required]],
    date: [null, [Validators.required]],
    service: [],
  });

  constructor(
    protected diagnosisService: DiagnosisService,
    protected consultationResourceService: ConsultationResourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diagnosis }) => {
      this.updateForm(diagnosis);

      this.consultationResourceService
        .query()
        .subscribe((res: HttpResponse<IConsultationResource[]>) => (this.consultationresources = res.body || []));
    });
  }

  updateForm(diagnosis: IDiagnosis): void {
    this.editForm.patchValue({
      id: diagnosis.id,
      symptoms: diagnosis.symptoms,
      date: diagnosis.date,
      service: diagnosis.service,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diagnosis = this.createFromForm();
    if (diagnosis.id !== undefined) {
      this.subscribeToSaveResponse(this.diagnosisService.update(diagnosis));
    } else {
      this.subscribeToSaveResponse(this.diagnosisService.create(diagnosis));
    }
  }

  private createFromForm(): IDiagnosis {
    return {
      ...new Diagnosis(),
      id: this.editForm.get(['id'])!.value,
      symptoms: this.editForm.get(['symptoms'])!.value,
      date: this.editForm.get(['date'])!.value,
      service: this.editForm.get(['service'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnosis>>): void {
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

  trackById(index: number, item: IConsultationResource): any {
    return item.id;
  }
}
