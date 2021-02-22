import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MeasurementUnitDetailComponent } from 'app/entities/measurement-unit/measurement-unit-detail.component';
import { MeasurementUnit } from 'app/shared/model/measurement-unit.model';

describe('Component Tests', () => {
  describe('MeasurementUnit Management Detail Component', () => {
    let comp: MeasurementUnitDetailComponent;
    let fixture: ComponentFixture<MeasurementUnitDetailComponent>;
    const route = ({ data: of({ measurementUnit: new MeasurementUnit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MeasurementUnitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MeasurementUnitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeasurementUnitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load measurementUnit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.measurementUnit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
