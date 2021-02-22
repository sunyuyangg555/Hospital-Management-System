import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';

@Component({
  selector: 'jhi-measurement-unit-detail',
  templateUrl: './measurement-unit-detail.component.html',
})
export class MeasurementUnitDetailComponent implements OnInit {
  measurementUnit: IMeasurementUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ measurementUnit }) => (this.measurementUnit = measurementUnit));
  }

  previousState(): void {
    window.history.back();
  }
}
