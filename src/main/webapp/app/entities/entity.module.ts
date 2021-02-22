import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.HospitalManagementSystemTransactionsModule),
      },
      {
        path: 'medical-service',
        loadChildren: () => import('./medical-service/medical-service.module').then(m => m.HospitalManagementSystemMedicalServiceModule),
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.HospitalManagementSystemDepartmentModule),
      },
      {
        path: 'consultation-resource',
        loadChildren: () =>
          import('./consultation-resource/consultation-resource.module').then(m => m.HospitalManagementSystemConsultationResourceModule),
      },
      {
        path: 'medicine',
        loadChildren: () => import('./medicine/medicine.module').then(m => m.HospitalManagementSystemMedicineModule),
      },
      {
        path: 'staff',
        loadChildren: () => import('./staff/staff.module').then(m => m.HospitalManagementSystemStaffModule),
      },
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.HospitalManagementSystemPatientModule),
      },
      {
        path: 'diagnosis',
        loadChildren: () => import('./diagnosis/diagnosis.module').then(m => m.HospitalManagementSystemDiagnosisModule),
      },
      {
        path: 'admission',
        loadChildren: () => import('./admission/admission.module').then(m => m.HospitalManagementSystemAdmissionModule),
      },
      {
        path: 'medicine-group',
        loadChildren: () => import('./medicine-group/medicine-group.module').then(m => m.HospitalManagementSystemMedicineGroupModule),
      },
      {
        path: 'medicine-category',
        loadChildren: () =>
          import('./medicine-category/medicine-category.module').then(m => m.HospitalManagementSystemMedicineCategoryModule),
      },
      {
        path: 'bed',
        loadChildren: () => import('./bed/bed.module').then(m => m.HospitalManagementSystemBedModule),
      },
      {
        path: 'admission-visit',
        loadChildren: () => import('./admission-visit/admission-visit.module').then(m => m.HospitalManagementSystemAdmissionVisitModule),
      },
      {
        path: 'ward',
        loadChildren: () => import('./ward/ward.module').then(m => m.HospitalManagementSystemWardModule),
      },
      {
        path: 'measurement-unit',
        loadChildren: () => import('./measurement-unit/measurement-unit.module').then(m => m.HospitalManagementSystemMeasurementUnitModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.HospitalManagementSystemRoleModule),
      },
      {
        path: 'privilege',
        loadChildren: () => import('./privilege/privilege.module').then(m => m.HospitalManagementSystemPrivilegeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HospitalManagementSystemEntityModule {}
