import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { WardDetailComponent } from 'app/entities/ward/ward-detail.component';
import { Ward } from 'app/shared/model/ward.model';

describe('Component Tests', () => {
  describe('Ward Management Detail Component', () => {
    let comp: WardDetailComponent;
    let fixture: ComponentFixture<WardDetailComponent>;
    const route = ({ data: of({ ward: new Ward(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [WardDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WardDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WardDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ward on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ward).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
