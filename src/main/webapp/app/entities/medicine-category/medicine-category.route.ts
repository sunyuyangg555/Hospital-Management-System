import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMedicineCategory, MedicineCategory } from 'app/shared/model/medicine-category.model';
import { MedicineCategoryService } from './medicine-category.service';
import { MedicineCategoryComponent } from './medicine-category.component';
import { MedicineCategoryDetailComponent } from './medicine-category-detail.component';
import { MedicineCategoryUpdateComponent } from './medicine-category-update.component';

@Injectable({ providedIn: 'root' })
export class MedicineCategoryResolve implements Resolve<IMedicineCategory> {
  constructor(private service: MedicineCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedicineCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((medicineCategory: HttpResponse<MedicineCategory>) => {
          if (medicineCategory.body) {
            return of(medicineCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedicineCategory());
  }
}

export const medicineCategoryRoute: Routes = [
  {
    path: '',
    component: MedicineCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedicineCategoryDetailComponent,
    resolve: {
      medicineCategory: MedicineCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedicineCategoryUpdateComponent,
    resolve: {
      medicineCategory: MedicineCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedicineCategoryUpdateComponent,
    resolve: {
      medicineCategory: MedicineCategoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalManagementSystemApp.medicineCategory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
