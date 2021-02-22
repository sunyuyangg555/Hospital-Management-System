import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiagnosis, Diagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisComponent } from './diagnosis.component';
import { DiagnosisDetailComponent } from './diagnosis-detail.component';
import { DiagnosisUpdateComponent } from './diagnosis-update.component';

@Injectable({ providedIn: 'root' })
export class DiagnosisResolve implements Resolve<IDiagnosis> {
  constructor(private service: DiagnosisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiagnosis> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diagnosis: HttpResponse<Diagnosis>) => {
          if (diagnosis.body) {
            return of(diagnosis.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Diagnosis());
  }
}

export const diagnosisRoute: Routes = [
  {
    path: '',
    component: DiagnosisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.diagnosis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiagnosisDetailComponent,
    resolve: {
      diagnosis: DiagnosisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.diagnosis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiagnosisUpdateComponent,
    resolve: {
      diagnosis: DiagnosisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.diagnosis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiagnosisUpdateComponent,
    resolve: {
      diagnosis: DiagnosisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.diagnosis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
