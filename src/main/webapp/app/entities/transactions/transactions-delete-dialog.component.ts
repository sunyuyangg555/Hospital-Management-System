import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactions } from 'app/shared/model/transactions.model';
import { TransactionsService } from './transactions.service';

@Component({
  templateUrl: './transactions-delete-dialog.component.html',
})
export class TransactionsDeleteDialogComponent {
  transactions?: ITransactions;

  constructor(
    protected transactionsService: TransactionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transactionsListModification');
      this.activeModal.close();
    });
  }
}
