import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdmission } from 'app/shared/model/admission.model';
import { AdmissionService } from './admission.service';
import { AdmissionDeleteDialogComponent } from './admission-delete-dialog.component';

@Component({
  selector: 'jhi-admission',
  templateUrl: './admission.component.html',
})
export class AdmissionComponent implements OnInit, OnDestroy {
  admissions?: IAdmission[];
  eventSubscriber?: Subscription;

  constructor(protected admissionService: AdmissionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.admissionService.query().subscribe((res: HttpResponse<IAdmission[]>) => (this.admissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdmissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdmission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAdmissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('admissionListModification', () => this.loadAll());
  }

  delete(admission: IAdmission): void {
    const modalRef = this.modalService.open(AdmissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.admission = admission;
  }
}
