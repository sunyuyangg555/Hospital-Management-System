import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdmissionVisit, AdmissionVisit } from 'app/shared/model/admission-visit.model';
import { AdmissionVisitService } from './admission-visit.service';
import { AdmissionVisitComponent } from './admission-visit.component';
import { AdmissionVisitDetailComponent } from './admission-visit-detail.component';
import { AdmissionVisitUpdateComponent } from './admission-visit-update.component';

@Injectable({ providedIn: 'root' })
export class AdmissionVisitResolve implements Resolve<IAdmissionVisit> {
  constructor(private service: AdmissionVisitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdmissionVisit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((admissionVisit: HttpResponse<AdmissionVisit>) => {
          if (admissionVisit.body) {
            return of(admissionVisit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdmissionVisit());
  }
}

export const admissionVisitRoute: Routes = [
  {
    path: '',
    component: AdmissionVisitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admissionVisit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdmissionVisitDetailComponent,
    resolve: {
      admissionVisit: AdmissionVisitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admissionVisit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdmissionVisitUpdateComponent,
    resolve: {
      admissionVisit: AdmissionVisitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admissionVisit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdmissionVisitUpdateComponent,
    resolve: {
      admissionVisit: AdmissionVisitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admissionVisit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
