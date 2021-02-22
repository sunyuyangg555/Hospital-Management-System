import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { ConsultationResourceUpdateComponent } from 'app/entities/consultation-resource/consultation-resource-update.component';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';
import { ConsultationResource } from 'app/shared/model/consultation-resource.model';

describe('Component Tests', () => {
  describe('ConsultationResource Management Update Component', () => {
    let comp: ConsultationResourceUpdateComponent;
    let fixture: ComponentFixture<ConsultationResourceUpdateComponent>;
    let service: ConsultationResourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [ConsultationResourceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ConsultationResourceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultationResourceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultationResourceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConsultationResource(123);
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
        const entity = new ConsultationResource();
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
