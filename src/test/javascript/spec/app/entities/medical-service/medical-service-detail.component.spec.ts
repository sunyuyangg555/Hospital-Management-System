import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicalServiceDetailComponent } from 'app/entities/medical-service/medical-service-detail.component';
import { MedicalService } from 'app/shared/model/medical-service.model';

describe('Component Tests', () => {
  describe('MedicalService Management Detail Component', () => {
    let comp: MedicalServiceDetailComponent;
    let fixture: ComponentFixture<MedicalServiceDetailComponent>;
    const route = ({ data: of({ medicalService: new MedicalService(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicalServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MedicalServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedicalServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medicalService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medicalService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
