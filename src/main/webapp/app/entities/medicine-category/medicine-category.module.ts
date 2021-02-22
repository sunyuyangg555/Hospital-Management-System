import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { MedicineCategoryComponent } from './medicine-category.component';
import { MedicineCategoryDetailComponent } from './medicine-category-detail.component';
import { MedicineCategoryUpdateComponent } from './medicine-category-update.component';
import { MedicineCategoryDeleteDialogComponent } from './medicine-category-delete-dialog.component';
import { medicineCategoryRoute } from './medicine-category.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(medicineCategoryRoute)],
  declarations: [
    MedicineCategoryComponent,
    MedicineCategoryDetailComponent,
    MedicineCategoryUpdateComponent,
    MedicineCategoryDeleteDialogComponent,
  ],
  entryComponents: [MedicineCategoryDeleteDialogComponent],
})
export class HospitalManagementSystemMedicineCategoryModule {}
