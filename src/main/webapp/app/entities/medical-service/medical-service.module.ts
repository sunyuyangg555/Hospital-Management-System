import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { MedicalServiceComponent } from './medical-service.component';
import { MedicalServiceDetailComponent } from './medical-service-detail.component';
import { MedicalServiceUpdateComponent } from './medical-service-update.component';
import { MedicalServiceDeleteDialogComponent } from './medical-service-delete-dialog.component';
import { medicalServiceRoute } from './medical-service.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(medicalServiceRoute)],
  declarations: [
    MedicalServiceComponent,
    MedicalServiceDetailComponent,
    MedicalServiceUpdateComponent,
    MedicalServiceDeleteDialogComponent,
  ],
  entryComponents: [MedicalServiceDeleteDialogComponent],
})
export class HospitalManagementSystemMedicalServiceModule {}
