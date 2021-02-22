import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { MeasurementUnitComponent } from './measurement-unit.component';
import { MeasurementUnitDetailComponent } from './measurement-unit-detail.component';
import { MeasurementUnitUpdateComponent } from './measurement-unit-update.component';
import { MeasurementUnitDeleteDialogComponent } from './measurement-unit-delete-dialog.component';
import { measurementUnitRoute } from './measurement-unit.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(measurementUnitRoute)],
  declarations: [
    MeasurementUnitComponent,
    MeasurementUnitDetailComponent,
    MeasurementUnitUpdateComponent,
    MeasurementUnitDeleteDialogComponent,
  ],
  entryComponents: [MeasurementUnitDeleteDialogComponent],
})
export class HospitalManagementSystemMeasurementUnitModule {}
