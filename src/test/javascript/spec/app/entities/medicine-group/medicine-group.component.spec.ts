import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineGroupComponent } from 'app/entities/medicine-group/medicine-group.component';
import { MedicineGroupService } from 'app/entities/medicine-group/medicine-group.service';
import { MedicineGroup } from 'app/shared/model/medicine-group.model';

describe('Component Tests', () => {
  describe('MedicineGroup Management Component', () => {
    let comp: MedicineGroupComponent;
    let fixture: ComponentFixture<MedicineGroupComponent>;
    let service: MedicineGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineGroupComponent],
      })
        .overrideTemplate(MedicineGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicineGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicineGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicineGroup(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicineGroups && comp.medicineGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
