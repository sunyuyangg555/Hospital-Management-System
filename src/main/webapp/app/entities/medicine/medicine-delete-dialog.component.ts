import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicine } from 'app/shared/model/medicine.model';
import { MedicineService } from './medicine.service';

@Component({
  templateUrl: './medicine-delete-dialog.component.html',
})
export class MedicineDeleteDialogComponent {
  medicine?: IMedicine;

  constructor(protected medicineService: MedicineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicineListModification');
      this.activeModal.close();
    });
  }
}
