import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicineGroup } from 'app/shared/model/medicine-group.model';
import { MedicineGroupService } from './medicine-group.service';

@Component({
  templateUrl: './medicine-group-delete-dialog.component.html',
})
export class MedicineGroupDeleteDialogComponent {
  medicineGroup?: IMedicineGroup;

  constructor(
    protected medicineGroupService: MedicineGroupService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicineGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicineGroupListModification');
      this.activeModal.close();
    });
  }
}
