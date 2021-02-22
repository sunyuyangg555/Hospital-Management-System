import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail.component';
import { RoleUpdateComponent } from './role-update.component';
import { RoleDeleteDialogComponent } from './role-delete-dialog.component';
import { roleRoute } from './role.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(roleRoute)],
  declarations: [RoleComponent, RoleDetailComponent, RoleUpdateComponent, RoleDeleteDialogComponent],
  entryComponents: [RoleDeleteDialogComponent],
})
export class HospitalManagementSystemRoleModule {}
