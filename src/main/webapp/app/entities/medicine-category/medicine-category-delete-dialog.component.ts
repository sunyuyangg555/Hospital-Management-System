import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicineCategory } from 'app/shared/model/medicine-category.model';
import { MedicineCategoryService } from './medicine-category.service';

@Component({
  templateUrl: './medicine-category-delete-dialog.component.html',
})
export class MedicineCategoryDeleteDialogComponent {
  medicineCategory?: IMedicineCategory;

  constructor(
    protected medicineCategoryService: MedicineCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicineCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicineCategoryListModification');
      this.activeModal.close();
    });
  }
}
