import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { AdmissionComponent } from './admission.component';
import { AdmissionDetailComponent } from './admission-detail.component';
import { AdmissionUpdateComponent } from './admission-update.component';
import { AdmissionDeleteDialogComponent } from './admission-delete-dialog.component';
import { admissionRoute } from './admission.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(admissionRoute)],
  declarations: [AdmissionComponent, AdmissionDetailComponent, AdmissionUpdateComponent, AdmissionDeleteDialogComponent],
  entryComponents: [AdmissionDeleteDialogComponent],
})
export class HospitalManagementSystemAdmissionModule {}
