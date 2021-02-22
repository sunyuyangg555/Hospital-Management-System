import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from './consultation-resource.service';

@Component({
  templateUrl: './consultation-resource-delete-dialog.component.html',
})
export class ConsultationResourceDeleteDialogComponent {
  consultationResource?: IConsultationResource;

  constructor(
    protected consultationResourceService: ConsultationResourceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consultationResourceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('consultationResourceListModification');
      this.activeModal.close();
    });
  }
}
