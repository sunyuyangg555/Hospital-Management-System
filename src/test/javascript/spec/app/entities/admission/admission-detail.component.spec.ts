import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { AdmissionDetailComponent } from 'app/entities/admission/admission-detail.component';
import { Admission } from 'app/shared/model/admission.model';

describe('Component Tests', () => {
  describe('Admission Management Detail Component', () => {
    let comp: AdmissionDetailComponent;
    let fixture: ComponentFixture<AdmissionDetailComponent>;
    const route = ({ data: of({ admission: new Admission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [AdmissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AdmissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdmissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load admission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.admission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
