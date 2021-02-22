import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdmission } from 'app/shared/model/admission.model';
import { AdmissionService } from './admission.service';

@Component({
  templateUrl: './admission-delete-dialog.component.html',
})
export class AdmissionDeleteDialogComponent {
  admission?: IAdmission;

  constructor(protected admissionService: AdmissionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.admissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('admissionListModification');
      this.activeModal.close();
    });
  }
}
