import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalManagementSystemTestModule } from '../../../test.module';
import { TransactionsComponent } from 'app/entities/transactions/transactions.component';
import { TransactionsService } from 'app/entities/transactions/transactions.service';
import { Transactions } from 'app/shared/model/transactions.model';

describe('Component Tests', () => {
  describe('Transactions Management Component', () => {
    let comp: TransactionsComponent;
    let fixture: ComponentFixture<TransactionsComponent>;
    let service: TransactionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalManagementSystemTestModule],
        declarations: [TransactionsComponent],
      })
        .overrideTemplate(TransactionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Transactions(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transactions && comp.transactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
