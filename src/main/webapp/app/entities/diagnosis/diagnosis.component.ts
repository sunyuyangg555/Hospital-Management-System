import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisDeleteDialogComponent } from './diagnosis-delete-dialog.component';

@Component({
  selector: 'jhi-diagnosis',
  templateUrl: './diagnosis.component.html',
})
export class DiagnosisComponent implements OnInit, OnDestroy {
  diagnoses?: IDiagnosis[];
  eventSubscriber?: Subscription;

  constructor(protected diagnosisService: DiagnosisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.diagnosisService.query().subscribe((res: HttpResponse<IDiagnosis[]>) => (this.diagnoses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiagnoses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiagnosis): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiagnoses(): void {
    this.eventSubscriber = this.eventManager.subscribe('diagnosisListModification', () => this.loadAll());
  }

  delete(diagnosis: IDiagnosis): void {
    const modalRef = this.modalService.open(DiagnosisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diagnosis = diagnosis;
  }
}
