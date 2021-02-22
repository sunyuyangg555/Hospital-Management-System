import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { PrivilegeUpdateComponent } from 'app/entities/privilege/privilege-update.component';
import { PrivilegeService } from 'app/entities/privilege/privilege.service';
import { Privilege } from 'app/shared/model/privilege.model';

describe('Component Tests', () => {
  describe('Privilege Management Update Component', () => {
    let comp: PrivilegeUpdateComponent;
    let fixture: ComponentFixture<PrivilegeUpdateComponent>;
    let service: PrivilegeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [PrivilegeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrivilegeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrivilegeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrivilegeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Privilege(123);
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
        const entity = new Privilege();
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
