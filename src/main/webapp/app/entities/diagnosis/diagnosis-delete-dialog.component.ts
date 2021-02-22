import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';

@Component({
  templateUrl: './diagnosis-delete-dialog.component.html',
})
export class DiagnosisDeleteDialogComponent {
  diagnosis?: IDiagnosis;

  constructor(protected diagnosisService: DiagnosisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diagnosisService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diagnosisListModification');
      this.activeModal.close();
    });
  }
}
