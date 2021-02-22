import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { ConsultationResourceDetailComponent } from 'app/entities/consultation-resource/consultation-resource-detail.component';
import { ConsultationResource } from 'app/shared/model/consultation-resource.model';

describe('Component Tests', () => {
  describe('ConsultationResource Management Detail Component', () => {
    let comp: ConsultationResourceDetailComponent;
    let fixture: ComponentFixture<ConsultationResourceDetailComponent>;
    const route = ({ data: of({ consultationResource: new ConsultationResource(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [ConsultationResourceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ConsultationResourceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultationResourceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load consultationResource on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consultationResource).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
