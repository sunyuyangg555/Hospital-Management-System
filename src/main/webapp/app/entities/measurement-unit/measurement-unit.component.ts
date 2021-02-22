import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnitDeleteDialogComponent } from './measurement-unit-delete-dialog.component';

@Component({
  selector: 'jhi-measurement-unit',
  templateUrl: './measurement-unit.component.html',
})
export class MeasurementUnitComponent implements OnInit, OnDestroy {
  measurementUnits?: IMeasurementUnit[];
  eventSubscriber?: Subscription;

  constructor(
    protected measurementUnitService: MeasurementUnitService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.measurementUnitService.query().subscribe((res: HttpResponse<IMeasurementUnit[]>) => (this.measurementUnits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMeasurementUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMeasurementUnit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMeasurementUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('measurementUnitListModification', () => this.loadAll());
  }

  delete(measurementUnit: IMeasurementUnit): void {
    const modalRef = this.modalService.open(MeasurementUnitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.measurementUnit = measurementUnit;
  }
}
