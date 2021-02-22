import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { BedUpdateComponent } from 'app/entities/bed/bed-update.component';
import { BedService } from 'app/entities/bed/bed.service';
import { Bed } from 'app/shared/model/bed.model';

describe('Component Tests', () => {
  describe('Bed Management Update Component', () => {
    let comp: BedUpdateComponent;
    let fixture: ComponentFixture<BedUpdateComponent>;
    let service: BedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [BedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bed(123);
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
        const entity = new Bed();
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
