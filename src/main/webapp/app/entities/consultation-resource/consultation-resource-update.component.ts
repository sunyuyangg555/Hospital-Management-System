import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConsultationResource, ConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from './consultation-resource.service';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from 'app/entities/staff/staff.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

type SelectableEntity = IStaff | IPatient;

@Component({
  selector: 'jhi-consultation-resource-update',
  templateUrl: './consultation-resource-update.component.html',
})
export class ConsultationResourceUpdateComponent implements OnInit {
  isSaving = false;
  staff: IStaff[] = [];
  patients: IPatient[] = [];
  fromdateDp: any;
  todateDp: any;

  editForm = this.fb.group({
    id: [],
    fromdate: [null, [Validators.required]],
    todate: [null, [Validators.required]],
    isActive: [],
    isAdmitted: [],
    staff: [],
    patient: [],
  });

  constructor(
    protected consultationResourceService: ConsultationResourceService,
    protected staffService: StaffService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultationResource }) => {
      this.updateForm(consultationResource);

      this.staffService.query().subscribe((res: HttpResponse<IStaff[]>) => (this.staff = res.body || []));

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
  }

  updateForm(consultationResource: IConsultationResource): void {
    this.editForm.patchValue({
      id: consultationResource.id,
      fromdate: consultationResource.fromdate,
      todate: consultationResource.todate,
      isActive: consultationResource.isActive,
      isAdmitted: consultationResource.isAdmitted,
      staff: consultationResource.staff,
      patient: consultationResource.patient,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consultationResource = this.createFromForm();
    if (consultationResource.id !== undefined) {
      this.subscribeToSaveResponse(this.consultationResourceService.update(consultationResource));
    } else {
      this.subscribeToSaveResponse(this.consultationResourceService.create(consultationResource));
    }
  }

  private createFromForm(): IConsultationResource {
    return {
      ...new ConsultationResource(),
      id: this.editForm.get(['id'])!.value,
      fromdate: this.editForm.get(['fromdate'])!.value,
      todate: this.editForm.get(['todate'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      isAdmitted: this.editForm.get(['isAdmitted'])!.value,
      staff: this.editForm.get(['staff'])!.value,
      patient: this.editForm.get(['patient'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultationResource>>): void {
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
