import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdmissionVisit, AdmissionVisit } from 'app/shared/model/admission-visit.model';
import { AdmissionVisitService } from './admission-visit.service';
import { IAdmission } from 'app/shared/model/admission.model';
import { AdmissionService } from 'app/entities/admission/admission.service';

@Component({
  selector: 'jhi-admission-visit-update',
  templateUrl: './admission-visit-update.component.html',
})
export class AdmissionVisitUpdateComponent implements OnInit {
  isSaving = false;
  admissions: IAdmission[] = [];
  dateTimeDp: any;

  editForm = this.fb.group({
    id: [],
    symptoms: [null, [Validators.required, Validators.maxLength(550)]],
    dateTime: [],
    admission: [],
  });

  constructor(
    protected admissionVisitService: AdmissionVisitService,
    protected admissionService: AdmissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ admissionVisit }) => {
      this.updateForm(admissionVisit);

      this.admissionService.query().subscribe((res: HttpResponse<IAdmission[]>) => (this.admissions = res.body || []));
    });
  }

  updateForm(admissionVisit: IAdmissionVisit): void {
    this.editForm.patchValue({
      id: admissionVisit.id,
      symptoms: admissionVisit.symptoms,
      dateTime: admissionVisit.dateTime,
      admission: admissionVisit.admission,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const admissionVisit = this.createFromForm();
    if (admissionVisit.id !== undefined) {
      this.subscribeToSaveResponse(this.admissionVisitService.update(admissionVisit));
    } else {
      this.subscribeToSaveResponse(this.admissionVisitService.create(admissionVisit));
    }
  }

  private createFromForm(): IAdmissionVisit {
    return {
      ...new AdmissionVisit(),
      id: this.editForm.get(['id'])!.value,
      symptoms: this.editForm.get(['symptoms'])!.value,
      dateTime: this.editForm.get(['dateTime'])!.value,
      admission: this.editForm.get(['admission'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdmissionVisit>>): void {
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

  trackById(index: number, item: IAdmission): any {
    return item.id;
  }
}
