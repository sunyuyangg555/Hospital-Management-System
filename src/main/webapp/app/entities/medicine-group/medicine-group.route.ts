import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicineGroup, MedicineGroup } from 'app/shared/model/medicine-group.model';
import { MedicineGroupService } from './medicine-group.service';
import { MedicineGroupComponent } from './medicine-group.component';
import { MedicineGroupDetailComponent } from './medicine-group-detail.component';
import { MedicineGroupUpdateComponent } from './medicine-group-update.component';

@Injectable({ providedIn: 'root' })
export class MedicineGroupResolve implements Resolve<IMedicineGroup> {
  constructor(private service: MedicineGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicineGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicineGroup: HttpResponse<MedicineGroup>) => {
          if (medicineGroup.body) {
            return of(medicineGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedicineGroup());
  }
}

export const medicineGroupRoute: Routes = [
  {
    path: '',
    component: MedicineGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedicineGroupDetailComponent,
    resolve: {
      medicineGroup: MedicineGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedicineGroupUpdateComponent,
    resolve: {
      medicineGroup: MedicineGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedicineGroupUpdateComponent,
    resolve: {
      medicineGroup: MedicineGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
