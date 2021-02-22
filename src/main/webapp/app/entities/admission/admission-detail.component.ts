import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdmission } from 'app/shared/model/admission.model';

@Component({
  selector: 'jhi-admission-detail',
  templateUrl: './admission-detail.component.html',
})
export class AdmissionDetailComponent implements OnInit {
  admission: IAdmission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ admission }) => (this.admission = admission));
  }

  previousState(): void {
    window.history.back();
  }
}
