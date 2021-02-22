import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStaff, Staff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { StaffComponent } from './staff.component';
import { StaffDetailComponent } from './staff-detail.component';
import { StaffUpdateComponent } from './staff-update.component';

@Injectable({ providedIn: 'root' })
export class StaffResolve implements Resolve<IStaff> {
  constructor(private service: StaffService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStaff> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((staff: HttpResponse<Staff>) => {
          if (staff.body) {
            return of(staff.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Staff());
  }
}

export const staffRoute: Routes = [
  {
    path: '',
    component: StaffComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.staff.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StaffDetailComponent,
    resolve: {
      staff: StaffResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.staff.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StaffUpdateComponent,
    resolve: {
      staff: StaffResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.staff.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StaffUpdateComponent,
    resolve: {
      staff: StaffResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.staff.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
