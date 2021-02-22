import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MeasurementUnitUpdateComponent } from 'app/entities/measurement-unit/measurement-unit-update.component';
import { MeasurementUnitService } from 'app/entities/measurement-unit/measurement-unit.service';
import { MeasurementUnit } from 'app/shared/model/measurement-unit.model';

describe('Component Tests', () => {
  describe('MeasurementUnit Management Update Component', () => {
    let comp: MeasurementUnitUpdateComponent;
    let fixture: ComponentFixture<MeasurementUnitUpdateComponent>;
    let service: MeasurementUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MeasurementUnitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MeasurementUnitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeasurementUnitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeasurementUnitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MeasurementUnit(123);
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
        const entity = new MeasurementUnit();
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
