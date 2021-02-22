import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionComponent } from 'app/entities/admission/admission.component';
import { AdmissionService } from 'app/entities/admission/admission.service';
import { Admission } from 'app/shared/model/admission.model';

describe('Component Tests', () => {
  describe('Admission Management Component', () => {
    let comp: AdmissionComponent;
    let fixture: ComponentFixture<AdmissionComponent>;
    let service: AdmissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionComponent],
      })
        .overrideTemplate(AdmissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdmissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdmissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Admission(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.admissions && comp.admissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
