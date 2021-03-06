import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AdmissionVisitDeleteDialogComponent } from 'app/entities/admission-visit/admission-visit-delete-dialog.component';
import { AdmissionVisitService } from 'app/entities/admission-visit/admission-visit.service';

describe('Component Tests', () => {
  describe('AdmissionVisit Management Delete Component', () => {
    let comp: AdmissionVisitDeleteDialogComponent;
    let fixture: ComponentFixture<AdmissionVisitDeleteDialogComponent>;
    let service: AdmissionVisitService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionVisitDeleteDialogComponent],
      })
        .overrideTemplate(AdmissionVisitDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdmissionVisitDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdmissionVisitService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
