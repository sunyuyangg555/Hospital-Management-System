import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HospitalManagementSystemSharedModule } from 'app/shared/shared.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsDetailComponent } from './transactions-detail.component';
import { TransactionsUpdateComponent } from './transactions-update.component';
import { TransactionsDeleteDialogComponent } from './transactions-delete-dialog.component';
import { transactionsRoute } from './transactions.route';

@NgModule({
  imports: [HospitalManagementSystemSharedModule, RouterModule.forChild(transactionsRoute)],
  declarations: [TransactionsComponent, TransactionsDetailComponent, TransactionsUpdateComponent, TransactionsDeleteDialogComponent],
  entryComponents: [TransactionsDeleteDialogComponent],
})
export class HospitalManagementSystemTransactionsModule {}
