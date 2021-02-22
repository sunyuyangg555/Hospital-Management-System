import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { AdmissionVisitComponent } from './admission-visit.component';
import { AdmissionVisitDetailComponent } from './admission-visit-detail.component';
import { AdmissionVisitUpdateComponent } from './admission-visit-update.component';
import { AdmissionVisitDeleteDialogComponent } from './admission-visit-delete-dialog.component';
import { admissionVisitRoute } from './admission-visit.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(admissionVisitRoute)],
  declarations: [
    AdmissionVisitComponent,
    AdmissionVisitDetailComponent,
    AdmissionVisitUpdateComponent,
    AdmissionVisitDeleteDialogComponent,
  ],
  entryComponents: [AdmissionVisitDeleteDialogComponent],
})
export class HospitalManagementSystemAdmissionVisitModule {}
