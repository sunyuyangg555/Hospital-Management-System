import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicalService } from 'app/shared/model/medical-service.model';
import { MedicalServiceService } from './medical-service.service';

@Component({
  templateUrl: './medical-service-delete-dialog.component.html',
})
export class MedicalServiceDeleteDialogComponent {
  medicalService?: IMedicalService;

  constructor(
    protected medicalServiceService: MedicalServiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medicalServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('medicalServiceListModification');
      this.activeModal.close();
    });
  }
}
