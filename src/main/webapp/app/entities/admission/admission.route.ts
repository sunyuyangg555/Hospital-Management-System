import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdmission, Admission } from 'app/shared/model/admission.model';
import { AdmissionService } from './admission.service';
import { AdmissionComponent } from './admission.component';
import { AdmissionDetailComponent } from './admission-detail.component';
import { AdmissionUpdateComponent } from './admission-update.component';

@Injectable({ providedIn: 'root' })
export class AdmissionResolve implements Resolve<IAdmission> {
  constructor(private service: AdmissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdmission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((admission: HttpResponse<Admission>) => {
          if (admission.body) {
            return of(admission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Admission());
  }
}

export const admissionRoute: Routes = [
  {
    path: '',
    component: AdmissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdmissionDetailComponent,
    resolve: {
      admission: AdmissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdmissionUpdateComponent,
    resolve: {
      admission: AdmissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdmissionUpdateComponent,
    resolve: {
      admission: AdmissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.admission.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
