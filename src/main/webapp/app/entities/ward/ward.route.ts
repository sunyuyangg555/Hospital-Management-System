import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWard, Ward } from 'app/shared/model/ward.model';
import { WardService } from './ward.service';
import { WardComponent } from './ward.component';
import { WardDetailComponent } from './ward-detail.component';
import { WardUpdateComponent } from './ward-update.component';

@Injectable({ providedIn: 'root' })
export class WardResolve implements Resolve<IWard> {
  constructor(private service: WardService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWard> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ward: HttpResponse<Ward>) => {
          if (ward.body) {
            return of(ward.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ward());
  }
}

export const wardRoute: Routes = [
  {
    path: '',
    component: WardComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.ward.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WardDetailComponent,
    resolve: {
      ward: WardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.ward.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WardUpdateComponent,
    resolve: {
      ward: WardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.ward.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WardUpdateComponent,
    resolve: {
      ward: WardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.ward.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
