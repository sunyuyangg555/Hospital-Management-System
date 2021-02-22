import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineCategoryDetailComponent } from 'app/entities/medicine-category/medicine-category-detail.component';
import { MedicineCategory } from 'app/shared/model/medicine-category.model';

describe('Component Tests', () => {
  describe('MedicineCategory Management Detail Component', () => {
    let comp: MedicineCategoryDetailComponent;
    let fixture: ComponentFixture<MedicineCategoryDetailComponent>;
    const route = ({ data: of({ medicineCategory: new MedicineCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MedicineCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicineCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medicineCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicineCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
