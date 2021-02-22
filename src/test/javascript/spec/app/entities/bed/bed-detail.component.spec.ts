import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { BedDetailComponent } from 'app/entities/bed/bed-detail.component';
import { Bed } from 'app/shared/model/bed.model';

describe('Component Tests', () => {
  describe('Bed Management Detail Component', () => {
    let comp: BedDetailComponent;
    let fixture: ComponentFixture<BedDetailComponent>;
    const route = ({ data: of({ bed: new Bed(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [BedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bed on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bed).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
