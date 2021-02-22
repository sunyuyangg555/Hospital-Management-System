import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMeasurementUnit, MeasurementUnit } from 'app/shared/model/measurement-unit.model';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnitComponent } from './measurement-unit.component';
import { MeasurementUnitDetailComponent } from './measurement-unit-detail.component';
import { MeasurementUnitUpdateComponent } from './measurement-unit-update.component';

@Injectable({ providedIn: 'root' })
export class MeasurementUnitResolve implements Resolve<IMeasurementUnit> {
  constructor(private service: MeasurementUnitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMeasurementUnit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((measurementUnit: HttpResponse<MeasurementUnit>) => {
          if (measurementUnit.body) {
            return of(measurementUnit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MeasurementUnit());
  }
}

export const measurementUnitRoute: Routes = [
  {
    path: '',
    component: MeasurementUnitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.measurementUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MeasurementUnitDetailComponent,
    resolve: {
      measurementUnit: MeasurementUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.measurementUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MeasurementUnitUpdateComponent,
    resolve: {
      measurementUnit: MeasurementUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.measurementUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MeasurementUnitUpdateComponent,
    resolve: {
      measurementUnit: MeasurementUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.measurementUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
