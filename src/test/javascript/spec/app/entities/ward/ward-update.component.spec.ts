import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { WardUpdateComponent } from 'app/entities/ward/ward-update.component';
import { WardService } from 'app/entities/ward/ward.service';
import { Ward } from 'app/shared/model/ward.model';

describe('Component Tests', () => {
  describe('Ward Management Update Component', () => {
    let comp: WardUpdateComponent;
    let fixture: ComponentFixture<WardUpdateComponent>;
    let service: WardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [WardUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ward(123);
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
        const entity = new Ward();
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
