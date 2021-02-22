import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';
import { MeasurementUnitService } from './measurement-unit.service';

@Component({
  templateUrl: './measurement-unit-delete-dialog.component.html',
})
export class MeasurementUnitDeleteDialogComponent {
  measurementUnit?: IMeasurementUnit;

  constructor(
    protected measurementUnitService: MeasurementUnitService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.measurementUnitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('measurementUnitListModification');
      this.activeModal.close();
    });
  }
}
