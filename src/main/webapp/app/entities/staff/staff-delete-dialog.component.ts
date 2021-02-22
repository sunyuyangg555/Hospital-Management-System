import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';

@Component({
  templateUrl: './staff-delete-dialog.component.html',
})
export class StaffDeleteDialogComponent {
  staff?: IStaff;

  constructor(protected staffService: StaffService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.staffService.delete(id).subscribe(() => {
      this.eventManager.broadcast('staffListModification');
      this.activeModal.close();
    });
  }
}
