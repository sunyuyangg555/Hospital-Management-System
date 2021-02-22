import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdmission, Admission } from 'app/shared/model/admission.model';
import { AdmissionService } from './admission.service';
import { IBed } from 'app/shared/model/bed.model';
import { BedService } from 'app/entities/bed/bed.service';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';

type SelectableEntity = IBed | IConsultationResource;

@Component({
  selector: 'jhi-admission-update',
  templateUrl: './admission-update.component.html',
})
export class AdmissionUpdateComponent implements OnInit {
  isSaving = false;
  beds: IBed[] = [];
  consultationresources: IConsultationResource[] = [];
  fromDateTimeDp: any;
  toDateTimeDp: any;

  editForm = this.fb.group({
    id: [],
    isActive: [null, [Validators.required]],
    fromDateTime: [null, [Validators.required]],
    toDateTime: [],
    beds: [],
    service: [],
  });

  constructor(
    protected admissionService: AdmissionService,
    protected bedService: BedService,
    protected consultationResourceService: ConsultationResourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ admission }) => {
      this.updateForm(admission);

      this.bedService.query().subscribe((res: HttpResponse<IBed[]>) => (this.beds = res.body || []));

      this.consultationResourceService
        .query()
        .subscribe((res: HttpResponse<IConsultationResource[]>) => (this.consultationresources = res.body || []));
    });
  }

  updateForm(admission: IAdmission): void {
    this.editForm.patchValue({
      id: admission.id,
      isActive: admission.isActive,
      fromDateTime: admission.fromDateTime,
      toDateTime: admission.toDateTime,
      beds: admission.beds,
      service: admission.service,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const admission = this.createFromForm();
    if (admission.id !== undefined) {
      this.subscribeToSaveResponse(this.admissionService.update(admission));
    } else {
      this.subscribeToSaveResponse(this.admissionService.create(admission));
    }
  }

  private createFromForm(): IAdmission {
    return {
      ...new Admission(),
      id: this.editForm.get(['id'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      fromDateTime: this.editForm.get(['fromDateTime'])!.value,
      toDateTime: this.editForm.get(['toDateTime'])!.value,
      beds: this.editForm.get(['beds'])!.value,
      service: this.editForm.get(['service'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdmission>>): void {
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

  getSelected(selectedVals: IBed[], option: IBed): IBed {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
