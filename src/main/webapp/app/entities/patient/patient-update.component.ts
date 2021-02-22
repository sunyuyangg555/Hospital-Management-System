import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html',
})
export class PatientUpdateComponent implements OnInit {
  isSaving = false;
  contactsinformations: IConsultationResource[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(100)]],
    guardianName: [null, [Validators.maxLength(100)]],
    phone: [null, [Validators.maxLength(15)]],
    address: [null, [Validators.maxLength(200)]],
    emailAddress: [null, [Validators.maxLength(20)]],
    height: [null, [Validators.required, Validators.maxLength(10)]],
    weight: [null, [Validators.required, Validators.maxLength(10)]],
    bloodPressure: [null, [Validators.required, Validators.maxLength(10)]],
    age: [null, [Validators.required]],
    isAdmitted: [null, [Validators.required]],
    patientPhoto: [null, [Validators.maxLength(255)]],
    bloodGroup: [],
    note: [],
    symptoms: [null, [Validators.maxLength(550)]],
    marriageStatus: [null, [Validators.maxLength(25)]],
    gender: [],
    isActive: [null, [Validators.required]],
    contactsInformation: [],
  });

  constructor(
    protected patientService: PatientService,
    protected consultationResourceService: ConsultationResourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);

      this.consultationResourceService
        .query({ filter: 'patient-is-null' })
        .pipe(
          map((res: HttpResponse<IConsultationResource[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IConsultationResource[]) => {
          if (!patient.contactsInformation || !patient.contactsInformation.id) {
            this.contactsinformations = resBody;
          } else {
            this.consultationResourceService
              .find(patient.contactsInformation.id)
              .pipe(
                map((subRes: HttpResponse<IConsultationResource>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IConsultationResource[]) => (this.contactsinformations = concatRes));
          }
        });
    });
  }

  updateForm(patient: IPatient): void {
    this.editForm.patchValue({
      id: patient.id,
      name: patient.name,
      guardianName: patient.guardianName,
      phone: patient.phone,
      address: patient.address,
      emailAddress: patient.emailAddress,
      height: patient.height,
      weight: patient.weight,
      bloodPressure: patient.bloodPressure,
      age: patient.age,
      isAdmitted: patient.isAdmitted,
      patientPhoto: patient.patientPhoto,
      bloodGroup: patient.bloodGroup,
      note: patient.note,
      symptoms: patient.symptoms,
      marriageStatus: patient.marriageStatus,
      gender: patient.gender,
      isActive: patient.isActive,
      contactsInformation: patient.contactsInformation,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      guardianName: this.editForm.get(['guardianName'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      address: this.editForm.get(['address'])!.value,
      emailAddress: this.editForm.get(['emailAddress'])!.value,
      height: this.editForm.get(['height'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      bloodPressure: this.editForm.get(['bloodPressure'])!.value,
      age: this.editForm.get(['age'])!.value,
      isAdmitted: this.editForm.get(['isAdmitted'])!.value,
      patientPhoto: this.editForm.get(['patientPhoto'])!.value,
      bloodGroup: this.editForm.get(['bloodGroup'])!.value,
      note: this.editForm.get(['note'])!.value,
      symptoms: this.editForm.get(['symptoms'])!.value,
      marriageStatus: this.editForm.get(['marriageStatus'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      contactsInformation: this.editForm.get(['contactsInformation'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>): void {
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
