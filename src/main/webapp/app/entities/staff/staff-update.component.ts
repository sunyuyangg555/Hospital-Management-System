import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStaff, Staff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';

type SelectableEntity = IUser | IDepartment;

@Component({
  selector: 'jhi-staff-update',
  templateUrl: './staff-update.component.html',
})
export class StaffUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  departments: IDepartment[] = [];

  editForm = this.fb.group({
    id: [],
    username: [null, []],
    fullName: [null, [Validators.maxLength(20)]],
    contacts: [],
    imageUrl: [],
    level: [],
    email: [],
    isActive: [],
    isAcailable: [],
    user: [],
    department: [],
  });

  constructor(
    protected staffService: StaffService,
    protected userService: UserService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staff }) => {
      this.updateForm(staff);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body || []));
    });
  }

  updateForm(staff: IStaff): void {
    this.editForm.patchValue({
      id: staff.id,
      username: staff.username,
      fullName: staff.fullName,
      contacts: staff.contacts,
      imageUrl: staff.imageUrl,
      level: staff.level,
      email: staff.email,
      isActive: staff.isActive,
      isAcailable: staff.isAcailable,
      user: staff.user,
      department: staff.department,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const staff = this.createFromForm();
    if (staff.id !== undefined) {
      this.subscribeToSaveResponse(this.staffService.update(staff));
    } else {
      this.subscribeToSaveResponse(this.staffService.create(staff));
    }
  }

  private createFromForm(): IStaff {
    return {
      ...new Staff(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      fullName: this.editForm.get(['fullName'])!.value,
      contacts: this.editForm.get(['contacts'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      level: this.editForm.get(['level'])!.value,
      email: this.editForm.get(['email'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      isAcailable: this.editForm.get(['isAcailable'])!.value,
      user: this.editForm.get(['user'])!.value,
      department: this.editForm.get(['department'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaff>>): void {
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
