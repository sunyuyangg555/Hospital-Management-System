import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicineCategory } from 'app/shared/model/medicine-category.model';
import { MedicineCategoryService } from './medicine-category.service';
import { MedicineCategoryDeleteDialogComponent } from './medicine-category-delete-dialog.component';

@Component({
  selector: 'jhi-medicine-category',
  templateUrl: './medicine-category.component.html',
})
export class MedicineCategoryComponent implements OnInit, OnDestroy {
  medicineCategories?: IMedicineCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected medicineCategoryService: MedicineCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.medicineCategoryService.query().subscribe((res: HttpResponse<IMedicineCategory[]>) => (this.medicineCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicineCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicineCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicineCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicineCategoryListModification', () => this.loadAll());
  }

  delete(medicineCategory: IMedicineCategory): void {
    const modalRef = this.modalService.open(MedicineCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicineCategory = medicineCategory;
  }
}
