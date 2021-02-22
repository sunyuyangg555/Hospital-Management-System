import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdmissionVisit } from 'app/shared/model/admission-visit.model';

@Component({
  selector: 'jhi-admission-visit-detail',
  templateUrl: './admission-visit-detail.component.html',
})
export class AdmissionVisitDetailComponent implements OnInit {
  admissionVisit: IAdmissionVisit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ admissionVisit }) => (this.admissionVisit = admissionVisit));
  }

  previousState(): void {
    window.history.back();
  }
}
