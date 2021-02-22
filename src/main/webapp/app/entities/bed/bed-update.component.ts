import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBed, Bed } from 'app/shared/model/bed.model';
import { BedService } from './bed.service';
import { IWard } from 'app/shared/model/ward.model';
import { WardService } from 'app/entities/ward/ward.service';

@Component({
  selector: 'jhi-bed-update',
  templateUrl: './bed-update.component.html',
})
export class BedUpdateComponent implements OnInit {
  isSaving = false;
  wards: IWard[] = [];

  editForm = this.fb.group({
    id: [],
    identifier: [null, [Validators.required, Validators.maxLength(20)]],
    isOccupied: [],
    ward: [],
  });

  constructor(
    protected bedService: BedService,
    protected wardService: WardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bed }) => {
      this.updateForm(bed);

      this.wardService.query().subscribe((res: HttpResponse<IWard[]>) => (this.wards = res.body || []));
    });
  }

  updateForm(bed: IBed): void {
    this.editForm.patchValue({
      id: bed.id,
      identifier: bed.identifier,
      isOccupied: bed.isOccupied,
      ward: bed.ward,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bed = this.createFromForm();
    if (bed.id !== undefined) {
      this.subscribeToSaveResponse(this.bedService.update(bed));
    } else {
      this.subscribeToSaveResponse(this.bedService.create(bed));
    }
  }

  private createFromForm(): IBed {
    return {
      ...new Bed(),
      id: this.editForm.get(['id'])!.value,
      identifier: this.editForm.get(['identifier'])!.value,
      isOccupied: this.editForm.get(['isOccupied'])!.value,
      ward: this.editForm.get(['ward'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBed>>): void {
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

  trackById(index: number, item: IWard): any {
    return item.id;
  }
}
