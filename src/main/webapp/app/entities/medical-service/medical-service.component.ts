import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedicalService } from 'app/shared/model/medical-service.model';
import { MedicalServiceService } from './medical-service.service';
import { MedicalServiceDeleteDialogComponent } from './medical-service-delete-dialog.component';

@Component({
  selector: 'jhi-medical-service',
  templateUrl: './medical-service.component.html',
})
export class MedicalServiceComponent implements OnInit, OnDestroy {
  medicalServices?: IMedicalService[];
  eventSubscriber?: Subscription;

  constructor(
    protected medicalServiceService: MedicalServiceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.medicalServiceService.query().subscribe((res: HttpResponse<IMedicalService[]>) => (this.medicalServices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedicalServices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedicalService): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedicalServices(): void {
    this.eventSubscriber = this.eventManager.subscribe('medicalServiceListModification', () => this.loadAll());
  }

  delete(medicalService: IMedicalService): void {
    const modalRef = this.modalService.open(MedicalServiceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medicalService = medicalService;
  }
}
