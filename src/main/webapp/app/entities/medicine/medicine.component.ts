import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicine } from 'app/shared/model/medicine.model';
import { MedicineService } from './medicine.service';
import { MedicineDeleteDialogComponent } from './medicine-delete-dialog.component';

@Component({
  selector: 'jhi-medicine',
  templateUrl: './medicine.component.html',
})
export class MedicineComponent implements OnInit, OnDestroy {
  medicines?: IMedicine[];
  eventSubscriber?: Subscription;

  constructor(protected medicineService: MedicineService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.medicineService.query().subscribe((res: HttpResponse<IMedicine[]>) => (this.medicines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicines(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicineListModification', () => this.loadAll());
  }

  delete(medicine: IMedicine): void {
    const modalRef = this.modalService.open(MedicineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicine = medicine;
  }
}
