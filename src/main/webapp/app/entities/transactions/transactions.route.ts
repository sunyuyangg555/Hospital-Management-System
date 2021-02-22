import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransactions, Transactions } from 'app/shared/model/transactions.model';
import { TransactionsService } from './transactions.service';
import { TransactionsComponent } from './transactions.component';
import { TransactionsDetailComponent } from './transactions-detail.component';
import { TransactionsUpdateComponent } from './transactions-update.component';

@Injectable({ providedIn: 'root' })
export class TransactionsResolve implements Resolve<ITransactions> {
  constructor(private service: TransactionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transactions: HttpResponse<Transactions>) => {
          if (transactions.body) {
            return of(transactions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Transactions());
  }
}

export const transactionsRoute: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.transactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionsDetailComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.transactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionsUpdateComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.transactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionsUpdateComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.transactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
