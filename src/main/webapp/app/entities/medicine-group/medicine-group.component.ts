import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicineGroup } from 'app/shared/model/medicine-group.model';
import { MedicineGroupService } from './medicine-group.service';
import { MedicineGroupDeleteDialogComponent } from './medicine-group-delete-dialog.component';

@Component({
  selector: 'jhi-medicine-group',
  templateUrl: './medicine-group.component.html',
})
export class MedicineGroupComponent implements OnInit, OnDestroy {
  medicineGroups?: IMedicineGroup[];
  eventSubscriber?: Subscription;

  constructor(
    protected medicineGroupService: MedicineGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.medicineGroupService.query().subscribe((res: HttpResponse<IMedicineGroup[]>) => (this.medicineGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicineGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicineGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicineGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicineGroupListModification', () => this.loadAll());
  }

  delete(medicineGroup: IMedicineGroup): void {
    const modalRef = this.modalService.open(MedicineGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicineGroup = medicineGroup;
  }
}
