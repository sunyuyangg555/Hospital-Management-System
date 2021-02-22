import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IAuthority } from 'app/shared/model/authority.model';
import { AuthorityService } from 'app/entities/authority/authority.service';
import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from 'app/entities/privilege/privilege.service';

type SelectableEntity = IAuthority | IPrivilege;

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html',
})
export class RoleUpdateComponent implements OnInit {
  isSaving = false;
  authorities: IAuthority[] = [];
  privileges: IPrivilege[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    authority: [],
    privileges: [],
  });

  constructor(
    protected roleService: RoleService,
    protected authorityService: AuthorityService,
    protected privilegeService: PrivilegeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);

      this.authorityService
        .query({ filter: 'role-is-null' })
        .pipe(
          map((res: HttpResponse<IAuthority[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAuthority[]) => {
          if (!role.authority || !role.authority.id) {
            this.authorities = resBody;
          } else {
            this.authorityService
              .find(role.authority.id)
              .pipe(
                map((subRes: HttpResponse<IAuthority>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAuthority[]) => (this.authorities = concatRes));
          }
        });

      this.privilegeService.query().subscribe((res: HttpResponse<IPrivilege[]>) => (this.privileges = res.body || []));
    });
  }

  updateForm(role: IRole): void {
    this.editForm.patchValue({
      id: role.id,
      name: role.name,
      authority: role.authority,
      privileges: role.privileges,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRole {
    return {
      ...new Role(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      authority: this.editForm.get(['authority'])!.value,
      privileges: this.editForm.get(['privileges'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>): void {
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

  getSelected(selectedVals: IPrivilege[], option: IPrivilege): IPrivilege {
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
