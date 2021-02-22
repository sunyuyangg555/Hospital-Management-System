import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITransactions, Transactions } from 'app/shared/model/transactions.model';
import { TransactionsService } from './transactions.service';
import { IMedicalService } from 'app/shared/model/medical-service.model';
import { MedicalServiceService } from 'app/entities/medical-service/medical-service.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';
import { IMedicine } from 'app/shared/model/medicine.model';
import { MedicineService } from 'app/entities/medicine/medicine.service';

type SelectableEntity = IMedicalService | IDepartment | IConsultationResource | IMedicine;

@Component({
  selector: 'jhi-transactions-update',
  templateUrl: './transactions-update.component.html',
})
export class TransactionsUpdateComponent implements OnInit {
  isSaving = false;
  medicalservices: IMedicalService[] = [];
  departments: IDepartment[] = [];
  consultationresources: IConsultationResource[] = [];
  medicines: IMedicine[] = [];
  transactionDateDp: any;

  editForm = this.fb.group({
    id: [],
    currencyCode: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    isReversed: [null, [Validators.required]],
    transactionDate: [null, [Validators.required]],
    medicalService: [null, Validators.required],
    department: [],
    consultation: [null, Validators.required],
    medicine: [],
  });

  constructor(
    protected transactionsService: TransactionsService,
    protected medicalServiceService: MedicalServiceService,
    protected departmentService: DepartmentService,
    protected consultationResourceService: ConsultationResourceService,
    protected medicineService: MedicineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactions }) => {
      this.updateForm(transactions);

      this.medicalServiceService.query().subscribe((res: HttpResponse<IMedicalService[]>) => (this.medicalservices = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body || []));

      this.consultationResourceService
        .query()
        .subscribe((res: HttpResponse<IConsultationResource[]>) => (this.consultationresources = res.body || []));

      this.medicineService.query().subscribe((res: HttpResponse<IMedicine[]>) => (this.medicines = res.body || []));
    });
  }

  updateForm(transactions: ITransactions): void {
    this.editForm.patchValue({
      id: transactions.id,
      currencyCode: transactions.currencyCode,
      amount: transactions.amount,
      isReversed: transactions.isReversed,
      transactionDate: transactions.transactionDate,
      medicalService: transactions.medicalService,
      department: transactions.department,
      consultation: transactions.consultation,
      medicine: transactions.medicine,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactions = this.createFromForm();
    if (transactions.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionsService.update(transactions));
    } else {
      this.subscribeToSaveResponse(this.transactionsService.create(transactions));
    }
  }

  private createFromForm(): ITransactions {
    return {
      ...new Transactions(),
      id: this.editForm.get(['id'])!.value,
      currencyCode: this.editForm.get(['currencyCode'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      isReversed: this.editForm.get(['isReversed'])!.value,
      transactionDate: this.editForm.get(['transactionDate'])!.value,
      medicalService: this.editForm.get(['medicalService'])!.value,
      department: this.editForm.get(['department'])!.value,
      consultation: this.editForm.get(['consultation'])!.value,
      medicine: this.editForm.get(['medicine'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactions>>): void {
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
