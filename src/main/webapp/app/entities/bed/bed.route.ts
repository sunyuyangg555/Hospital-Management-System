import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBed, Bed } from 'app/shared/model/bed.model';
import { BedService } from './bed.service';
import { BedComponent } from './bed.component';
import { BedDetailComponent } from './bed-detail.component';
import { BedUpdateComponent } from './bed-update.component';

@Injectable({ providedIn: 'root' })
export class BedResolve implements Resolve<IBed> {
  constructor(private service: BedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBed> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bed: HttpResponse<Bed>) => {
          if (bed.body) {
            return of(bed.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bed());
  }
}

export const bedRoute: Routes = [
  {
    path: '',
    component: BedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.bed.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BedDetailComponent,
    resolve: {
      bed: BedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.bed.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BedUpdateComponent,
    resolve: {
      bed: BedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.bed.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BedUpdateComponent,
    resolve: {
      bed: BedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.bed.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
