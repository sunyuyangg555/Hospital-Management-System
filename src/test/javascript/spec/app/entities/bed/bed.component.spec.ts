import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { BedComponent } from 'app/entities/bed/bed.component';
import { BedService } from 'app/entities/bed/bed.service';
import { Bed } from 'app/shared/model/bed.model';

describe('Component Tests', () => {
  describe('Bed Management Component', () => {
    let comp: BedComponent;
    let fixture: ComponentFixture<BedComponent>;
    let service: BedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [BedComponent],
      })
        .overrideTemplate(BedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bed(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.beds && comp.beds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
