import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MeasurementUnitComponent } from 'app/entities/measurement-unit/measurement-unit.component';
import { MeasurementUnitService } from 'app/entities/measurement-unit/measurement-unit.service';
import { MeasurementUnit } from 'app/shared/model/measurement-unit.model';

describe('Component Tests', () => {
  describe('MeasurementUnit Management Component', () => {
    let comp: MeasurementUnitComponent;
    let fixture: ComponentFixture<MeasurementUnitComponent>;
    let service: MeasurementUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MeasurementUnitComponent],
      })
        .overrideTemplate(MeasurementUnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeasurementUnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeasurementUnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MeasurementUnit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.measurementUnits && comp.measurementUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
