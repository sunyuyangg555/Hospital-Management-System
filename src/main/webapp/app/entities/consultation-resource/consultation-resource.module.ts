import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { ConsultationResourceComponent } from './consultation-resource.component';
import { ConsultationResourceDetailComponent } from './consultation-resource-detail.component';
import { ConsultationResourceUpdateComponent } from './consultation-resource-update.component';
import { ConsultationResourceDeleteDialogComponent } from './consultation-resource-delete-dialog.component';
import { consultationResourceRoute } from './consultation-resource.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(consultationResourceRoute)],
  declarations: [
    ConsultationResourceComponent,
    ConsultationResourceDetailComponent,
    ConsultationResourceUpdateComponent,
    ConsultationResourceDeleteDialogComponent,
  ],
  entryComponents: [ConsultationResourceDeleteDialogComponent],
})
export class HospitalManagementSystemConsultationResourceModule {}
