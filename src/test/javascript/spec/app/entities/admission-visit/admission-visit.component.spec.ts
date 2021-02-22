import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionVisitComponent } from 'app/entities/admission-visit/admission-visit.component';
import { AdmissionVisitService } from 'app/entities/admission-visit/admission-visit.service';
import { AdmissionVisit } from 'app/shared/model/admission-visit.model';

describe('Component Tests', () => {
  describe('AdmissionVisit Management Component', () => {
    let comp: AdmissionVisitComponent;
    let fixture: ComponentFixture<AdmissionVisitComponent>;
    let service: AdmissionVisitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionVisitComponent],
      })
        .overrideTemplate(AdmissionVisitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdmissionVisitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdmissionVisitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdmissionVisit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.admissionVisits && comp.admissionVisits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
