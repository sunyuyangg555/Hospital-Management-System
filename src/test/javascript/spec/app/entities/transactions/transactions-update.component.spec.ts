import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { TransactionsUpdateComponent } from 'app/entities/transactions/transactions-update.component';
import { TransactionsService } from 'app/entities/transactions/transactions.service';
import { Transactions } from 'app/shared/model/transactions.model';

describe('Component Tests', () => {
  describe('Transactions Management Update Component', () => {
    let comp: TransactionsUpdateComponent;
    let fixture: ComponentFixture<TransactionsUpdateComponent>;
    let service: TransactionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [TransactionsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TransactionsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transactions(123);
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
        const entity = new Transactions();
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
