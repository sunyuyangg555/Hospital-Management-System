import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStaff } from 'app/shared/model/staff.model';

@Component({
  selector: 'jhi-staff-detail',
  templateUrl: './staff-detail.component.html',
})
export class StaffDetailComponent implements OnInit {
  staff: IStaff | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staff }) => (this.staff = staff));
  }

  previousState(): void {
    window.history.back();
  }
}
