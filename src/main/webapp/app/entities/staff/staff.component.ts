import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { StaffDeleteDialogComponent } from './staff-delete-dialog.component';

@Component({
  selector: 'jhi-staff',
  templateUrl: './staff.component.html',
})
export class StaffComponent implements OnInit, OnDestroy {
  staff?: IStaff[];
  eventSubscriber?: Subscription;

  constructor(protected staffService: StaffService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.staffService.query().subscribe((res: HttpResponse<IStaff[]>) => (this.staff = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStaff();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStaff): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStaff(): void {
    this.eventSubscriber = this.eventManager.subscribe('staffListModification', () => this.loadAll());
  }

  delete(staff: IStaff): void {
    const modalRef = this.modalService.open(StaffDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.staff = staff;
  }
}
