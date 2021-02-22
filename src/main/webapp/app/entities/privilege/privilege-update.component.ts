import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrivilege, Privilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';

@Component({
  selector: 'jhi-privilege-update',
  templateUrl: './privilege-update.component.html',
})
export class PrivilegeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected privilegeService: PrivilegeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ privilege }) => {
      this.updateForm(privilege);
    });
  }

  updateForm(privilege: IPrivilege): void {
    this.editForm.patchValue({
      id: privilege.id,
      name: privilege.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const privilege = this.createFromForm();
    if (privilege.id !== undefined) {
      this.subscribeToSaveResponse(this.privilegeService.update(privilege));
    } else {
      this.subscribeToSaveResponse(this.privilegeService.create(privilege));
    }
  }

  private createFromForm(): IPrivilege {
    return {
      ...new Privilege(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrivilege>>): void {
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
