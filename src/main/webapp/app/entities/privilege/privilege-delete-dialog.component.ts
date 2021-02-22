import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';

@Component({
  templateUrl: './privilege-delete-dialog.component.html',
})
export class PrivilegeDeleteDialogComponent {
  privilege?: IPrivilege;

  constructor(protected privilegeService: PrivilegeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.privilegeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('privilegeListModification');
      this.activeModal.close();
    });
  }
}
