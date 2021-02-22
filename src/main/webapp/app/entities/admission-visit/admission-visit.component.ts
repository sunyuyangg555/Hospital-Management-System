import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdmissionVisit } from 'app/shared/model/admission-visit.model';
import { AdmissionVisitService } from './admission-visit.service';
import { AdmissionVisitDeleteDialogComponent } from './admission-visit-delete-dialog.component';

@Component({
  selector: 'jhi-admission-visit',
  templateUrl: './admission-visit.component.html',
})
export class AdmissionVisitComponent implements OnInit, OnDestroy {
  admissionVisits?: IAdmissionVisit[];
  eventSubscriber?: Subscription;

  constructor(
    protected admissionVisitService: AdmissionVisitService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.admissionVisitService.query().subscribe((res: HttpResponse<IAdmissionVisit[]>) => (this.admissionVisits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdmissionVisits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdmissionVisit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAdmissionVisits(): void {
    this.eventSubscriber = this.eventManager.subscribe('admissionVisitListModification', () => this.loadAll());
  }

  delete(admissionVisit: IAdmissionVisit): void {
    const modalRef = this.modalService.open(AdmissionVisitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.admissionVisit = admissionVisit;
  }
}
