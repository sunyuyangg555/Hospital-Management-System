import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactions } from 'app/shared/model/transactions.model';
import { TransactionsService } from './transactions.service';
import { TransactionsDeleteDialogComponent } from './transactions-delete-dialog.component';

@Component({
  selector: 'jhi-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions?: ITransactions[];
  eventSubscriber?: Subscription;

  constructor(
    protected transactionsService: TransactionsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.transactionsService.query().subscribe((res: HttpResponse<ITransactions[]>) => (this.transactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransactions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransactions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransactions(): void {
    this.eventSubscriber = this.eventManager.subscribe('transactionsListModification', () => this.loadAll());
  }

  delete(transactions: ITransactions): void {
    const modalRef = this.modalService.open(TransactionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactions = transactions;
  }
}
