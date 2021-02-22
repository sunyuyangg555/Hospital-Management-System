import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionVisitDetailComponent } from 'app/entities/admission-visit/admission-visit-detail.component';
import { AdmissionVisit } from 'app/shared/model/admission-visit.model';

describe('Component Tests', () => {
  describe('AdmissionVisit Management Detail Component', () => {
    let comp: AdmissionVisitDetailComponent;
    let fixture: ComponentFixture<AdmissionVisitDetailComponent>;
    const route = ({ data: of({ admissionVisit: new AdmissionVisit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionVisitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AdmissionVisitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdmissionVisitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load admissionVisit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.admissionVisit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
