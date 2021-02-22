import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { DiagnosisComponent } from 'app/entities/diagnosis/diagnosis.component';
import { DiagnosisService } from 'app/entities/diagnosis/diagnosis.service';
import { Diagnosis } from 'app/shared/model/diagnosis.model';

describe('Component Tests', () => {
  describe('Diagnosis Management Component', () => {
    let comp: DiagnosisComponent;
    let fixture: ComponentFixture<DiagnosisComponent>;
    let service: DiagnosisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [DiagnosisComponent],
      })
        .overrideTemplate(DiagnosisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiagnosisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiagnosisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Diagnosis(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diagnoses && comp.diagnoses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
