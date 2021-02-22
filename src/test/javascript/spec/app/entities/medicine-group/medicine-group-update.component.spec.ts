import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { MedicineGroupUpdateComponent } from 'app/entities/medicine-group/medicine-group-update.component';
import { MedicineGroupService } from 'app/entities/medicine-group/medicine-group.service';
import { MedicineGroup } from 'app/shared/model/medicine-group.model';

describe('Component Tests', () => {
  describe('MedicineGroup Management Update Component', () => {
    let comp: MedicineGroupUpdateComponent;
    let fixture: ComponentFixture<MedicineGroupUpdateComponent>;
    let service: MedicineGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [MedicineGroupUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MedicineGroupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicineGroupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicineGroupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedicineGroup(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MedicineGroup();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
