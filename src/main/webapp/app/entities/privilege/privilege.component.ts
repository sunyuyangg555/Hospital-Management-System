import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';
import { PrivilegeDeleteDialogComponent } from './privilege-delete-dialog.component';

@Component({
  selector: 'jhi-privilege',
  templateUrl: './privilege.component.html',
})
export class PrivilegeComponent implements OnInit, OnDestroy {
  privileges?: IPrivilege[];
  eventSubscriber?: Subscription;

  constructor(protected privilegeService: PrivilegeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.privilegeService.query().subscribe((res: HttpResponse<IPrivilege[]>) => (this.privileges = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrivileges();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrivilege): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrivileges(): void {
    this.eventSubscriber = this.eventManager.subscribe('privilegeListModification', () => this.loadAll());
  }

  delete(privilege: IPrivilege): void {
    const modalRef = this.modalService.open(PrivilegeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.privilege = privilege;
  }
}
