import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { WardComponent } from 'app/entities/ward/ward.component';
import { WardService } from 'app/entities/ward/ward.service';
import { Ward } from 'app/shared/model/ward.model';

describe('Component Tests', () => {
  describe('Ward Management Component', () => {
    let comp: WardComponent;
    let fixture: ComponentFixture<WardComponent>;
    let service: WardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [WardComponent],
      })
        .overrideTemplate(WardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WardComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WardService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ward(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.wards && comp.wards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
