import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineCategoryComponent } from 'app/entities/medicine-category/medicine-category.component';
import { MedicineCategoryService } from 'app/entities/medicine-category/medicine-category.service';
import { MedicineCategory } from 'app/shared/model/medicine-category.model';

describe('Component Tests', () => {
  describe('MedicineCategory Management Component', () => {
    let comp: MedicineCategoryComponent;
    let fixture: ComponentFixture<MedicineCategoryComponent>;
    let service: MedicineCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineCategoryComponent],
      })
        .overrideTemplate(MedicineCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicineCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicineCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicineCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicineCategories && comp.medicineCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
