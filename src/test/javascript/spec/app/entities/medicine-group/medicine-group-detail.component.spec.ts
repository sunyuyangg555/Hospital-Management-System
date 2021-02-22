import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineGroupDetailComponent } from 'app/entities/medicine-group/medicine-group-detail.component';
import { MedicineGroup } from 'app/shared/model/medicine-group.model';

describe('Component Tests', () => {
  describe('MedicineGroup Management Detail Component', () => {
    let comp: MedicineGroupDetailComponent;
    let fixture: ComponentFixture<MedicineGroupDetailComponent>;
    const route = ({ data: of({ medicineGroup: new MedicineGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MedicineGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicineGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medicineGroup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicineGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
