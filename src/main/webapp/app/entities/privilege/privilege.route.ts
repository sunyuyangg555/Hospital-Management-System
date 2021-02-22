import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrivilege, Privilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';
import { PrivilegeComponent } from './privilege.component';
import { PrivilegeDetailComponent } from './privilege-detail.component';
import { PrivilegeUpdateComponent } from './privilege-update.component';

@Injectable({ providedIn: 'root' })
export class PrivilegeResolve implements Resolve<IPrivilege> {
  constructor(private service: PrivilegeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrivilege> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((privilege: HttpResponse<Privilege>) => {
          if (privilege.body) {
            return of(privilege.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Privilege());
  }
}

export const privilegeRoute: Routes = [
  {
    path: '',
    component: PrivilegeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.privilege.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrivilegeDetailComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.privilege.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrivilegeUpdateComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.privilege.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrivilegeUpdateComponent,
    resolve: {
      privilege: PrivilegeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.privilege.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
