import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWard } from 'app/shared/model/ward.model';
import { WardService } from './ward.service';

@Component({
  templateUrl: './ward-delete-dialog.component.html',
})
export class WardDeleteDialogComponent {
  ward?: IWard;

  constructor(protected wardService: WardService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wardService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wardListModification');
      this.activeModal.close();
    });
  }
}
