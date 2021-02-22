import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBed } from 'app/shared/model/bed.model';
import { BedService } from './bed.service';
import { BedDeleteDialogComponent } from './bed-delete-dialog.component';

@Component({
  selector: 'jhi-bed',
  templateUrl: './bed.component.html',
})
export class BedComponent implements OnInit, OnDestroy {
  beds?: IBed[];
  eventSubscriber?: Subscription;

  constructor(protected bedService: BedService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.bedService.query().subscribe((res: HttpResponse<IBed[]>) => (this.beds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBed): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('bedListModification', () => this.loadAll());
  }

  delete(bed: IBed): void {
    const modalRef = this.modalService.open(BedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bed = bed;
  }
}
