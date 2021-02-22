import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiagnosis } from 'app/shared/model/diagnosis.model';

@Component({
  selector: 'jhi-diagnosis-detail',
  templateUrl: './diagnosis-detail.component.html',
})
export class DiagnosisDetailComponent implements OnInit {
  diagnosis: IDiagnosis | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diagnosis }) => (this.diagnosis = diagnosis));
  }

  previousState(): void {
    window.history.back();
  }
}
