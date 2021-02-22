import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { StaffUpdateComponent } from 'app/entities/staff/staff-update.component';
import { StaffService } from 'app/entities/staff/staff.service';
import { Staff } from 'app/shared/model/staff.model';

describe('Component Tests', () => {
  describe('Staff Management Update Component', () => {
    let comp: StaffUpdateComponent;
    let fixture: ComponentFixture<StaffUpdateComponent>;
    let service: StaffService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [StaffUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(StaffUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StaffUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StaffService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Staff(123);
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
        const entity = new Staff();
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
