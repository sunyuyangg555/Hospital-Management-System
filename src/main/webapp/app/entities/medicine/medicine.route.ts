import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicine, Medicine } from 'app/shared/model/medicine.model';
import { MedicineService } from './medicine.service';
import { MedicineComponent } from './medicine.component';
import { MedicineDetailComponent } from './medicine-detail.component';
import { MedicineUpdateComponent } from './medicine-update.component';

@Injectable({ providedIn: 'root' })
export class MedicineResolve implements Resolve<IMedicine> {
  constructor(private service: MedicineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicine: HttpResponse<Medicine>) => {
          if (medicine.body) {
            return of(medicine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Medicine());
  }
}

export const medicineRoute: Routes = [
  {
    path: '',
    component: MedicineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedicineDetailComponent,
    resolve: {
      medicine: MedicineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedicineUpdateComponent,
    resolve: {
      medicine: MedicineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedicineUpdateComponent,
    resolve: {
      medicine: MedicineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
