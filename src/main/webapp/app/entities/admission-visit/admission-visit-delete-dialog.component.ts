import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdmissionVisit } from 'app/shared/model/admission-visit.model';
import { AdmissionVisitService } from './admission-visit.service';

@Component({
  templateUrl: './admission-visit-delete-dialog.component.html',
})
export class AdmissionVisitDeleteDialogComponent {
  admissionVisit?: IAdmissionVisit;

  constructor(
    protected admissionVisitService: AdmissionVisitService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.admissionVisitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('admissionVisitListModification');
      this.activeModal.close();
    });
  }
}
