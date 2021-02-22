import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineCategoryUpdateComponent } from 'app/entities/medicine-category/medicine-category-update.component';
import { MedicineCategoryService } from 'app/entities/medicine-category/medicine-category.service';
import { MedicineCategory } from 'app/shared/model/medicine-category.model';

describe('Component Tests', () => {
  describe('MedicineCategory Management Update Component', () => {
    let comp: MedicineCategoryUpdateComponent;
    let fixture: ComponentFixture<MedicineCategoryUpdateComponent>;
    let service: MedicineCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MedicineCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicineCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicineCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedicineCategory(123);
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
        const entity = new MedicineCategory();
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
