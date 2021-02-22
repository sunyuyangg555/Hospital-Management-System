import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from './consultation-resource.service';
import { ConsultationResourceDeleteDialogComponent } from './consultation-resource-delete-dialog.component';

@Component({
  selector: 'jhi-consultation-resource',
  templateUrl: './consultation-resource.component.html',
})
export class ConsultationResourceComponent implements OnInit, OnDestroy {
  consultationResources?: IConsultationResource[];
  eventSubscriber?: Subscription;

  constructor(
    protected consultationResourceService: ConsultationResourceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.consultationResourceService
      .query()
      .subscribe((res: HttpResponse<IConsultationResource[]>) => (this.consultationResources = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConsultationResources();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConsultationResource): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConsultationResources(): void {
    this.eventSubscriber = this.eventManager.subscribe('consultationResourceListModification', () => this.loadAll());
  }

  delete(consultationResource: IConsultationResource): void {
    const modalRef = this.modalService.open(ConsultationResourceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consultationResource = consultationResource;
  }
}
