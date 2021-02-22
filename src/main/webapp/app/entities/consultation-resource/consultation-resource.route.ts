import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConsultationResource, ConsultationResource } from 'app/shared/model/consultation-resource.model';
import { ConsultationResourceService } from './consultation-resource.service';
import { ConsultationResourceComponent } from './consultation-resource.component';
import { ConsultationResourceDetailComponent } from './consultation-resource-detail.component';
import { ConsultationResourceUpdateComponent } from './consultation-resource-update.component';

@Injectable({ providedIn: 'root' })
export class ConsultationResourceResolve implements Resolve<IConsultationResource> {
  constructor(private service: ConsultationResourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsultationResource> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((consultationResource: HttpResponse<ConsultationResource>) => {
          if (consultationResource.body) {
            return of(consultationResource.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConsultationResource());
  }
}

export const consultationResourceRoute: Routes = [
  {
    path: '',
    component: ConsultationResourceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.consultationResource.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsultationResourceDetailComponent,
    resolve: {
      consultationResource: ConsultationResourceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.consultationResource.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsultationResourceUpdateComponent,
    resolve: {
      consultationResource: ConsultationResourceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.consultationResource.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsultationResourceUpdateComponent,
    resolve: {
      consultationResource: ConsultationResourceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.consultationResource.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
