import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionVisitUpdateComponent } from 'app/entities/admission-visit/admission-visit-update.component';
import { AdmissionVisitService } from 'app/entities/admission-visit/admission-visit.service';
import { AdmissionVisit } from 'app/shared/model/admission-visit.model';

describe('Component Tests', () => {
  describe('AdmissionVisit Management Update Component', () => {
    let comp: AdmissionVisitUpdateComponent;
    let fixture: ComponentFixture<AdmissionVisitUpdateComponent>;
    let service: AdmissionVisitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionVisitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AdmissionVisitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdmissionVisitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdmissionVisitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AdmissionVisit(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AdmissionVisit();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
