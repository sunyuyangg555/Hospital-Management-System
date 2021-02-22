import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionUpdateComponent } from 'app/entities/admission/admission-update.component';
import { AdmissionService } from 'app/entities/admission/admission.service';
import { Admission } from 'app/shared/model/admission.model';

describe('Component Tests', () => {
  describe('Admission Management Update Component', () => {
    let comp: AdmissionUpdateComponent;
    let fixture: ComponentFixture<AdmissionUpdateComponent>;
    let service: AdmissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AdmissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdmissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdmissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Admission(123);
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
        const entity = new Admission();
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
