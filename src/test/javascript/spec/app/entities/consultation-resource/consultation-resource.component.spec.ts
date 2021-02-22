import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { ConsultationResourceComponent } from 'app/entities/consultation-resource/consultation-resource.component';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';
import { ConsultationResource } from 'app/shared/model/consultation-resource.model';

describe('Component Tests', () => {
  describe('ConsultationResource Management Component', () => {
    let comp: ConsultationResourceComponent;
    let fixture: ComponentFixture<ConsultationResourceComponent>;
    let service: ConsultationResourceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [ConsultationResourceComponent],
      })
        .overrideTemplate(ConsultationResourceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultationResourceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultationResourceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ConsultationResource(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consultationResources && comp.consultationResources[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
