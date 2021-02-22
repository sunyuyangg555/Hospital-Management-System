import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicalServiceUpdateComponent } from 'app/entities/medical-service/medical-service-update.component';
import { MedicalServiceService } from 'app/entities/medical-service/medical-service.service';
import { MedicalService } from 'app/shared/model/medical-service.model';

describe('Component Tests', () => {
  describe('MedicalService Management Update Component', () => {
    let comp: MedicalServiceUpdateComponent;
    let fixture: ComponentFixture<MedicalServiceUpdateComponent>;
    let service: MedicalServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicalServiceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MedicalServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicalServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicalServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedicalService(123);
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
        const entity = new MedicalService();
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
