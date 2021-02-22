import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { DiagnosisComponent } from './diagnosis.component';
import { DiagnosisDetailComponent } from './diagnosis-detail.component';
import { DiagnosisUpdateComponent } from './diagnosis-update.component';
import { DiagnosisDeleteDialogComponent } from './diagnosis-delete-dialog.component';
import { diagnosisRoute } from './diagnosis.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(diagnosisRoute)],
  declarations: [DiagnosisComponent, DiagnosisDetailComponent, DiagnosisUpdateComponent, DiagnosisDeleteDialogComponent],
  entryComponents: [DiagnosisDeleteDialogComponent],
})
export class HospitalManagementSystemDiagnosisModule {}
