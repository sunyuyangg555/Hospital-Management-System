import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicalServiceComponent } from 'app/entities/medical-service/medical-service.component';
import { MedicalServiceService } from 'app/entities/medical-service/medical-service.service';
import { MedicalService } from 'app/shared/model/medical-service.model';

describe('Component Tests', () => {
  describe('MedicalService Management Component', () => {
    let comp: MedicalServiceComponent;
    let fixture: ComponentFixture<MedicalServiceComponent>;
    let service: MedicalServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicalServiceComponent],
      })
        .overrideTemplate(MedicalServiceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicalServiceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicalServiceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicalService(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicalServices && comp.medicalServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
