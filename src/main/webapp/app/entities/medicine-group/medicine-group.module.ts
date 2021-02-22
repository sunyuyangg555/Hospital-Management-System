import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { MedicineGroupComponent } from './medicine-group.component';
import { MedicineGroupDetailComponent } from './medicine-group-detail.component';
import { MedicineGroupUpdateComponent } from './medicine-group-update.component';
import { MedicineGroupDeleteDialogComponent } from './medicine-group-delete-dialog.component';
import { medicineGroupRoute } from './medicine-group.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(medicineGroupRoute)],
  declarations: [MedicineGroupComponent, MedicineGroupDetailComponent, MedicineGroupUpdateComponent, MedicineGroupDeleteDialogComponent],
  entryComponents: [MedicineGroupDeleteDialogComponent],
})
export class HospitalManagementSystemMedicineGroupModule {}
